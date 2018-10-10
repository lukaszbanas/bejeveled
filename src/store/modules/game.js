const
    M_START_NEW = 'new',
    M_ADD_SCORE = 'add_score'

const state = {
    running: false,
    score: 0
}

const getters = {
    isRunning: (state) => {
        return state.running === true
    }
}

const mutations = {
    [M_START_NEW] (state) {
        state.running = true
    },
    [M_ADD_SCORE] (state, payload) {
        state.score += payload
    }
}

const actions = {
    startNew: ({ commit }) => {
        commit(M_START_NEW);
    },
    addScore: ({ commit }, points) => {
        commit(M_ADD_SCORE, points);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}