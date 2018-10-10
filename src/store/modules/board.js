import Vue from 'vue'
import Area from '../../classes/Area'
import Gem from '../../classes/Gem'

const M_GENERATE = 'generate',
    M_DROP_FIELDS = 'drop_fields',
    M_CHECK_BOARD = 'check_board',
    M_PREPARE_BOARD_FOR_MOVE = 'prepare_board_for_move',
    M_CLEANUP_BOARD_AFTER_MOVE = 'cleanup_board_after_move',
    M_MAKE_MOVE = 'make_move'

const CONFIG_ANIMATION_SPEED = 200

const state = {
    board: [],
    rows: 0,
    cols: 0,
    canMakeMove: true,
    pointsGained: 0,
    emptyFields: 0
}

const getters = {
    hasEmptyFields: () => {
        let col, row, gems = 0

        for (col = state.cols - 1; col >= 0; col--) {
            for (row = state.rows - 1; row >= 0; row--) {
                if (state.board[row][col].getGem() !== null) {
                    gems++
                }
            }
        }

        return gems !== (state.rows * state.cols)
    }
}

const mutations = {
    [M_GENERATE] (state, payload) {
        state.rows = payload.rows
        state.cols = payload.cols

        for (let row = 0; row < state.rows; row++) {
            let temp = []

            for (let col = 0; col < state.cols; col++) {
                temp[col] = new Area({'x': col, 'y': row})
            }

            Vue.set(state.board, row, temp)
        }
    },
    [M_DROP_FIELDS] (state) {
        let row, col, finished = false

        state.emptyFields = 0

        while (finished === false) {
            for (col = state.cols - 1; col >= 0; col--) {
                for (row = state.rows - 1; row >= 0; row--) {
                    if (!state.board[row][col].hasGem()) {
                        if (row - 1 >= 0) {
                            state.board[row][col].setGem(state.board[row - 1][col].pullGem())
                        } else {
                            state.board[row][col].setGem(new Gem())
                        }

                        saveBoardToState(state)
                        finished = true
                    }
                }
            }
        }

        saveBoardToState(state)
    },
    [M_CHECK_BOARD] (state) {
        let row, col, matches

        for (col = state.cols - 1; col >= 0; col--) {
            for (row = state.rows - 1; row >= 0; row--) {
                ['x', 'y'].forEach(direction => {
                    matches = state.board[row][col].getMatch(state.board, direction)

                    if (matches.length > 2) {
                        state.pointsGained += matches.length

                        matches.forEach(match => {
                            state.board[match.y][match.x].removeGem()
                            state.emptyFields ++
                        })
                    }
                })
            }
        }
    },
    [M_MAKE_MOVE] (state, payload) {
        let gem1 = state.board[payload.first.y][payload.first.x].getGem(),
            gem2 = state.board[payload.second.y][payload.second.x].getGem()

        state.board[payload.first.y][payload.first.x].setGem(gem2)
        state.board[payload.second.y][payload.second.x].setGem(gem1)

        saveBoardToState(state)
    },
    [M_PREPARE_BOARD_FOR_MOVE] (state) {
        state.pointsGained = 0
        state.emptyFields = 0
        state.canMakeMove = false
    },
    [M_CLEANUP_BOARD_AFTER_MOVE] (state) {
        state.canMakeMove = true
    }
}

const actions = {
    generate: ({ commit }) => {
        commit(M_GENERATE, {rows: 10, cols: 10});
    },
    dropFields: async ({ commit }) => {
        commit(M_DROP_FIELDS)
    },
    checkBoard: async ({ commit }) => {
        commit(M_CHECK_BOARD)
        await wait(CONFIG_ANIMATION_SPEED)
    },
    makeMove: async ({ commit, dispatch }, positions) => {
        commit(M_PREPARE_BOARD_FOR_MOVE)
        commit(M_MAKE_MOVE, positions)
        await dispatch('checkBoard')

        while (getters.hasEmptyFields()) {
            await dispatch('dropFields')
            await dispatch('checkBoard')

        }

        commit(M_CLEANUP_BOARD_AFTER_MOVE)
    }
}

/** internal function for propagation state changes across components */
const saveBoardToState = (state) => {
    for (let [rowIndex, row] of state.board) {
        Vue.set(state.board, rowIndex, row)
    }
}

const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}