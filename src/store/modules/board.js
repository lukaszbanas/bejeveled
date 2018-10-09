import Vue from 'vue'
import Area from '../../classes/Area'
import Gem from '../../classes/Gem'

const M_GENERATE = 'generate',
    M_CHECK_BOARD = 'check_board'

const CONFIG_ANIMATION_SPEED = 300

const state = {
    board: [],
    rows: 0,
    cols: 0,
    canMakeMove: true
}

const getters = {
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
    async [M_CHECK_BOARD] (state) {
        let row, col, finished = false, foundColWithAction = false, matches,
            wait = ms => new Promise((r)=>setTimeout(r, ms))

        state.canMakeMove = false

        while (finished === false) {
            foundColWithAction = false

            for (col = state.cols - 1; col >= 0; col--) {
                for (row = state.rows - 1; row >= 0; row--) {
                    if (!state.board[row][col].hasGem()) {
                        if (row - 1 >= 0) {
                            state.board[row][col].setGem(state.board[row - 1][col].pullGem())
                        } else {
                            state.board[row][col].setGem(new Gem())
                        }

                        saveBoardToState(state)
                        foundColWithAction = true
                    }

                    matches = state.board[row][col].getMatch(state.board, 'x')

                    if (matches.length > 2) {
                        matches.forEach(match => {
                            state.board[match.y][match.x].removeGem()
                        })
                    }

                    matches = state.board[row][col].getMatch(state.board, 'y')

                    if (matches.length > 2) {
                        matches.forEach(match => {
                            state.board[match.y][match.x].removeGem()
                        })
                    }
                }
            }

            if (foundColWithAction === false) {
                finished = true
            } else {
                await wait(CONFIG_ANIMATION_SPEED)
            }
        }

        state.canMakeMove = true
    }
}

const actions = {
    generate: ({ commit }) => {
        commit(M_GENERATE, {rows: 10, cols: 10});
    },
    makeMove: ({ commit }, positions) => {
        let gem1 = state.board[positions.first.y][positions.first.x].getGem(),
            gem2 = state.board[positions.second.y][positions.second.x].getGem()

        state.board[positions.first.y][positions.first.x].setGem(gem2)
        state.board[positions.second.y][positions.second.x].setGem(gem1)

        saveBoardToState(state)
        commit(M_CHECK_BOARD)
    }
}

/** internal function for propagation state changes across components */
const saveBoardToState = (state) => {
    for (let [rowIndex, row] of state.board) {
        Vue.set(state.board, rowIndex, row)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}