const
  M_START_NEW = 'new',
  M_ADD_SCORE = 'add_score',
  M_FINISH_LEVEL = 'finish_level',
  M_FAIL_GAME = 'fail_game',
  M_LOAD = 'load',
  M_SET_LAST_SAVE_HASH = 'set_last_save_hash',
  M_SET_HIGHSCORES = 'set_highscores'

const state = {
  running: false,
  score: 0,
  finished: false,
  failed: false,
  saveHash: '',
  highscores: []
}

const getters = {
  isRunning: (state) => {
    return state.running === true
  }
}

const mutations = {
  [M_START_NEW](state) {
    state.running = true
    state.score = 0
    state.finished = false
  },
  [M_ADD_SCORE](state, payload) {
    state.score += payload
  },
  [M_FINISH_LEVEL](state) {
    state.finished = true
  },
  [M_FAIL_GAME](state) {
    state.finished = true
    state.failed = true
  },
  [M_LOAD](state, data) {
    state.running = data.running
    state.score = data.score
    state.finished = data.finished
    state.failed = data.failed
  },
  [M_SET_LAST_SAVE_HASH](state, payload) {
    state.saveHash = payload
  },
  [M_SET_HIGHSCORES](state, payload) {
    state.highscores = payload
  }
}

const actions = {
  startNew: ({commit}) => {
    commit(M_START_NEW)
  },
  addScore: ({commit}, points) => {
    commit(M_ADD_SCORE, points)
  },
  finishLevel: ({commit}) => {
    commit(M_FINISH_LEVEL)
  },
  failLevel: ({commit, dispatch, rootState}) => {
    commit(M_FAIL_GAME)
    dispatch('ws/postScore', {
      name: rootState.auth.loggedAs !== null ? rootState.auth.loggedAs : 'Anonim',
      score: rootState.progress.score
    }, {root: true})
    dispatch('progress/delete', null, {root: true})
  },
  load: ({commit}, data) => {
    commit(M_LOAD, data)
  },
  setHash: ({commit}, hash) => {
    commit(M_SET_LAST_SAVE_HASH, hash)
  },
  setHighscores: ({commit}, payload) => {
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