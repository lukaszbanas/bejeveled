const
    M_START_NEW = 'new',
    M_ADD_SCORE = 'add_score',
    M_FINISH_LEVEL = 'finish_level',
    M_FAIL_GAME = 'fail_game',
    M_SET_OAUTH = 'set_oauth',
    M_SET_LOGGED_AS = 'set_logged_as',
    M_SET_HIGHSCORES = 'set_highscores'

const state = {
    running: false,
    score: 0,
    finished: false,
    failed: false,
    oauth: null,
    loggedAs: null,
    highscores: []
}

const getters = {
    isRunning: (state) => {
        return state.running === true
    }
}

const mutations = {
    [M_START_NEW] (state) {
        state.running = true
        state.score = 0
        state.finished = false
    },
    [M_ADD_SCORE] (state, payload) {
        state.score += payload
    },
    [M_FINISH_LEVEL] (state) {
        state.finished = true
    },
    [M_FAIL_GAME] (state) {
        state.finished = true
        state.failed = true
    },
    [M_SET_OAUTH] (state, payload) {
        state.oauth = payload.token
        state.loggedAs = payload.name
    },
    [M_SET_HIGHSCORES] (state, payload) {
        state.highscores = payload
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
    },
    failLevel: ({ commit }) => {
        commit(M_FAIL_GAME)
    },
    setOauth: ({ commit }, payload) => {
        commit(M_SET_OAUTH, payload)
    },
    setHighscores: ({ commit }, payload) => {
        commit(M_SET_HIGHSCORES, payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}