const M_START_NEW = 'new'

const state = {
    running: false
}

const getters = {
    isRunning: (state) => {
        return state.running === true
    }
}

const mutations = {
    [M_START_NEW] (state) {
        state.running = true
    }
}

const actions = {
    startNew: ({ commit }) => {
        commit(M_START_NEW);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}