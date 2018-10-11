const
    M_INCREASE_LEVEL = 'increase_level',
    M_STORE_SCORE = 'store_score',
    M_END_GAME = 'end_game'

const state = {
    level: 1,
    score: 0,
    maxLvl: 5,
    gameEnded: false
}

const getters = {

}

const mutations = {
    [M_INCREASE_LEVEL] (state, payload) {
        state.level = payload
    },
    [M_STORE_SCORE] (state, payload) {
        state.score += payload
    },
    [M_END_GAME] (state) {
        state.gameEnded = true
    }
}

const actions = {
    increaseLevel: ({ commit, rootState }) => {
        if (rootState.board.currentLevel < state.maxLvl) {
            commit(M_INCREASE_LEVEL, rootState.board.currentLevel + 1)
        } else {
            commit(M_END_GAME)
        }
    },
    storeScore: ({ commit, rootState }) => {
        commit(M_STORE_SCORE, rootState.game.score)
    },
    save: ({ dispatch }) => {
        dispatch('increaseLevel')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}