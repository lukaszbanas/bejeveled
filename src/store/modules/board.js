import Vue from 'vue'
import Area from '../../classes/Area'
import Gem from '../../classes/Gem'
import MatchGemsGameTarget from '../../classes/MatchGemsGameTarget'
import ScoreGameTarget from '../../classes/ScoreGameTarget'

const M_GENERATE = 'generate',
    M_DROP_FIELDS = 'drop_fields',
    M_CHECK_BOARD = 'check_board',
    M_REMOVE_GEMS = 'remove_gems',
    M_PREPARE_BOARD_FOR_MOVE = 'prepare_board_for_move',
    M_CLEANUP_BOARD_AFTER_MOVE = 'cleanup_board_after_move',
    M_MAKE_MOVE = 'make_move',
    M_CLICK_AT = 'click_at',
    M_SET_GAME_TARGET = 'set_game_target',
    M_MARK_BOARD_AS_PREPARED = 'mark_board_as_prepared',
    M_SET_LEVEL = 'set_level'

const CONFIG_ANIMATION_SPEED = 200

const state = {
    board: [],
    rows: 0,
    cols: 0,
    boardPrepared: false,
    canMakeMove: true,
    pointsGained: 0,
    gemsToRemove: [],
    clickedArea: null,
    matchedGems: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    },
    gameTarget: null,
    currentLevel: 1
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
    },
    getGameTarget: (state) => {
        return state.gameTarget
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
                        if (state.boardPrepared) {
                            state.pointsGained += matches.length
                        }

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
            if (state.board[match.y][match.x].getGem() !== null && state.boardPrepared) {
                state.matchedGems[state.board[match.y][match.x].getGemType()]++
            }

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
    },
    [M_SET_GAME_TARGET] (state, payload) {
        state.gameTarget = payload
    },
    [M_MARK_BOARD_AS_PREPARED] (state) {
        state.boardPrepared = true
        state.matchedGems = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    },
    [M_SET_LEVEL] (state, payload) {
        state.currentLevel = payload
    }
}

const actions = {
    generate: async ({ commit, dispatch }) => {
        commit(M_GENERATE, {rows: 10, cols: 10})
        commit(M_SET_GAME_TARGET, await getLvlTarget(state.currentLevel))

        await dispatch('checkBoard', 0)

        while (getters.hasEmptyFields(state)) {
            await dispatch('dropFields')
            await dispatch('checkBoard', 0)
        }

        commit(M_MARK_BOARD_AS_PREPARED)
    },
    setLevel: async ({ commit, dispatch }, level) => {
        commit(M_SET_LEVEL, level)
        dispatch('generate')
    },
    dropFields: async ({ commit }) => {
        commit(M_DROP_FIELDS)
    },
    checkBoard: async ({ commit }, animationSpeed) => {
        commit(M_CHECK_BOARD)
        await wait(animationSpeed)
        commit(M_REMOVE_GEMS)

    },
    makeMove: async ({ commit, dispatch, rootState }, positions) => {
        commit(M_PREPARE_BOARD_FOR_MOVE)
        commit(M_MAKE_MOVE, positions)
        await dispatch('checkBoard', CONFIG_ANIMATION_SPEED)

        while (getters.hasEmptyFields(state)) {
            await dispatch('dropFields')
            await dispatch('checkBoard', CONFIG_ANIMATION_SPEED)
        }

        commit(M_CLEANUP_BOARD_AFTER_MOVE)
        dispatch('game/addScore', state.pointsGained, {root: true})
        dispatch('progress/storeScore', null, {root: true})

        if (state.gameTarget.isSatisfied({
            'score': rootState.game.score,
            'match-type-1': state.matchedGems[1],
            'match-type-2': state.matchedGems[2],
            'match-type-3': state.matchedGems[3],
            'match-type-4': state.matchedGems[4],
            'match-type-5': state.matchedGems[5]
        })) {
            dispatch('game/finishLevel', null, {root: true})
        }
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

/**
 *
 * @param ms
 * @returns {Promise<any>}
 */
const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 *
 * @param lvl
 * @returns {GameTarget}
 */
const getLvlTarget = async lvl => {
    return await import('../../levels/' + lvl)
        .then(file => {return file.default})
        .then(json => {return GameTargetFactory(json.type, json.props)})
        .catch(error => {
            throw new Error('Error while loading level data: ' + error)
        })
}

/**
 *
 * @param type
 * @param params
 * @returns {MatchGemsGameTarget|ScoreGameTarget}
 * @constructor
 */
const GameTargetFactory = (type, params) => {
    if (type === 'MatchGemsGameTarget') {
        return new MatchGemsGameTarget(params)
    } else if (type === 'ScoreGameTarget') {
        return new ScoreGameTarget(params)
    }

    throw new Error('No game target found')
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}