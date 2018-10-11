const
    M_INCREASE_LEVEL = 'increase_level',
    M_STORE_SCORE = 'store_score'

const state = {
    level: 1,
    score: 0
}

const getters = {

}

const mutations = {
    [M_INCREASE_LEVEL] (state, payload) {
        state.level = payload
    },
    [M_STORE_SCORE] (state, payload) {
        state.score = payload
    }
}

const actions = {
    increaseLevel: ({ commit, rootState }) => {
        commit(M_INCREASE_LEVEL, rootState.board.currentLevel + 1)
    },
    storeScore: ({ commit, rootState }) => {
        commit(M_STORE_SCORE, rootState.game.score)
    },
    save: ({ dispatch }) => {
        dispatch('increaseLevel')
        dispatch('storeScore')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}