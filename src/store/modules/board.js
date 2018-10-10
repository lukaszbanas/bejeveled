import Vue from 'vue'
import Area from '../../classes/Area'
import Gem from '../../classes/Gem'

const M_GENERATE = 'generate',
    M_DROP_FIELDS = 'drop_fields',
    M_CHECK_BOARD = 'check_board',
    M_REMOVE_GEMS = 'remove_gems',
    M_PREPARE_BOARD_FOR_MOVE = 'prepare_board_for_move',
    M_CLEANUP_BOARD_AFTER_MOVE = 'cleanup_board_after_move',
    M_MAKE_MOVE = 'make_move',
    M_CLICK_AT = 'click_at'

const CONFIG_ANIMATION_SPEED = 200

const state = {
    board: [],
    rows: 0,
    cols: 0,
    canMakeMove: true,
    pointsGained: 0,
    gemsToRemove: [],
    clickedArea: null
}

const getters = {
    hasEmptyFields: (state) => {
        let col, row, gems = 0

        for (col = state.cols - 1; col >= 0; col--) {
            for (row = state.rows - 1; row >= 0; row--) {
                if (state.board[row][col].getGem() !== null) {
                    gems++
                }
            }
        }

        return gems !== (state.rows * state.cols)
    },
    isPositionContainsGemToRemove: (state) => (position) => {
        return typeof state.gemsToRemove.find( (match) => {
            return match.x === position.x && match.y === position.y
        }) !== 'undefined'
    },
    hasGemBelow: (state) => (position) => {
        return typeof state.board[position.y + 1] !== 'undefined' &&
            typeof state.board[position.y + 1][position.x] !== 'undefined' &&
            state.board[position.y + 1][position.x].getGem() === null
    },
    hasClickedArea: (state) => {
        return state.clickedArea !== null
    },
    getClickedArea: (state) => {
        return state.clickedArea
    },
    isClickedArea: (state) => (position) => {
        return state.clickedArea !== null && state.clickedArea.x === position.x && state.clickedArea.y === position.y
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

        state.gemsToRemove = []

        for (col = state.cols - 1; col >= 0; col--) {
            for (row = state.rows - 1; row >= 0; row--) {
                ['x', 'y'].forEach(direction => {
                    matches = state.board[row][col].getMatch(state.board, direction)

                    if (matches.length > 2) {
                        state.pointsGained += matches.length

                        matches.forEach(match => {
                            state.gemsToRemove.push(match)
                        })
                    }
                })
            }
        }
    },
    [M_REMOVE_GEMS] (state) {
        state.gemsToRemove.forEach(match => {
            state.board[match.y][match.x].removeGem()
        })
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
        state.clickedArea = null
    },
    [M_CLEANUP_BOARD_AFTER_MOVE] (state) {
        state.canMakeMove = true
    },
    [M_CLICK_AT] (state, payload) {
        state.clickedArea = payload
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
        commit(M_REMOVE_GEMS)

    },
    makeMove: async ({ commit, dispatch }, positions) => {
        commit(M_PREPARE_BOARD_FOR_MOVE)
        commit(M_MAKE_MOVE, positions)
        await dispatch('checkBoard')

        while (getters.hasEmptyFields(state)) {
            await dispatch('dropFields')
            await dispatch('checkBoard')

        }

        commit(M_CLEANUP_BOARD_AFTER_MOVE)
    },
    clickAtArea: ({ commit }, position) => {
        commit(M_CLICK_AT, position)
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