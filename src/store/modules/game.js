const
    M_START_NEW = 'new',
    M_ADD_SCORE = 'add_score',
    M_FINISH_LEVEL = 'finish_level'

const state = {
    running: false,
    score: 0,
    finished: false
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
    },
    [M_FINISH_LEVEL] (state) {
        state.finished = true
    }
}

const actions = {
    startNew: ({ commit }) => {
        commit(M_START_NEW)
    },
    addScore: ({ commit }, points) => {
        commit(M_ADD_SCORE, points)
    },
    finishLevel: ({ commit }) => {
        commit(M_FINISH_LEVEL)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}