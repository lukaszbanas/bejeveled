import SavesApi from '../../classes/SavesApi'
import * as debug from "debug";

const
  M_INCREASE_LEVEL = 'increase_level',
  M_STORE_SCORE = 'store_score',
  M_END_GAME = 'end_game',
  M_SET_STATUS_IDLE = 'set_status_idle',
  M_SET_STATUS_WORKING = 'set_status_working',
  M_SET_STATUS_ERROR = 'set_status_error',
  M_LOAD = 'load',
  M_RESTART_GAME = 'restart_game'

const state = {
  level: 1,
  score: 0,
  maxLvl: process.env.VUE_APP_GAME_CONFIG_MAX_LEVEL,
  gameEnded: false,
  apiStatus: 'idle',
  apiStatusMessage: ''
}

const getters = {}

const mutations = {
  [M_INCREASE_LEVEL](state, payload) {
    state.level = payload
  },
  [M_STORE_SCORE](state, payload) {
    state.score += payload
  },
  [M_END_GAME](state) {
    state.gameEnded = true
  },
  [M_SET_STATUS_IDLE](state) {
    state.apiStatus = 'idle'
  },
  [M_SET_STATUS_WORKING](state) {
    state.apiStatusMessage = ''
    state.apiStatus = 'working'
  },
  [M_SET_STATUS_ERROR](state, msg) {
    state.apiStatus = 'error'
    state.apiStatusMessage = msg
  },
  [M_LOAD](state, data) {
    state.level = data.level
    state.score = data.score
    state.maxLvl = data.maxLvl
    state.gameEnded = data.gameEnded
  },
  [M_RESTART_GAME](state) {
    state.gameEnded = false
    state.score = 0
    state.level = 1
  }
}

const actions = {
  increaseLevel: ({commit}) => {
    if (state.level < state.maxLvl) {
      commit(M_INCREASE_LEVEL, state.level + 1)
    } else {
      commit(M_END_GAME)
    }
  },
  storeScore: ({commit, rootState}) => {
    commit(M_STORE_SCORE, rootState.game.score)
  },
  save: ({commit, dispatch, rootState}) => {
    if (rootState.auth.oauth !== null) {
      commit(M_SET_STATUS_WORKING)
      let api = new SavesApi(process.env.VUE_APP_SAVES_SERVER_URL, rootState.auth.oauth)

      api.post({
        'hash': rootState.game.saveHash,
        'save': {
          'game': rootState.game,
          'progress': rootState.progress
        }
      }).then(async result => {
        result.json().then(jsonResult => {
          if (result.ok) {
            dispatch('game/setHash', jsonResult.data.hash, {root: true})
            commit(M_SET_STATUS_IDLE)
          } else {
            commit(M_SET_STATUS_ERROR, 'cannot save game state. Status: ' + result.status)
            debug.log('API Error: ' + jsonResult.data)
          }
        })
      }, error => {
        commit(M_SET_STATUS_ERROR, 'cannot save game state. (fetch error)')
        debug.log('API Error: ' + error)
      })
    }

    dispatch('increaseLevel')
  },
  load: ({commit, dispatch, rootState}) => {
    if (rootState.auth.oauth !== null) {
      commit(M_SET_STATUS_WORKING)

      let api = new SavesApi(process.env.VUE_APP_SAVES_SERVER_URL, rootState.auth.oauth)

      api.get().then(async result => {
        if (result.ok) {
          await result.json().then(compiled => {
            let game, hash, progress

            ({game, hash, progress} = SavesApi.parseRecivedData(compiled))

            if (typeof game !== 'undefined' && typeof hash !== 'undefined') {
                dispatch('game/load', game, {root: true})
                dispatch('game/setHash', hash, {root: true})

                if (typeof progress !== 'undefined') {
                    commit(M_LOAD, progress)
                }
            }
          })

          commit(M_SET_STATUS_IDLE)
        } else {
          commit(M_SET_STATUS_ERROR, 'cannot load game state. Status: ' + result.status)
          debug.log('API Error: ' + await result.text())
        }
      }, error => {
        commit(M_SET_STATUS_ERROR, 'cannot load game state. (fetch error)')
        debug.log('API Error: ' + error)
      })
    }
  },
  delete: ({commit, rootState}) => {
    if (rootState.auth.oauth !== null) {
      commit(M_SET_STATUS_WORKING)

      let api = new SavesApi(process.env.VUE_APP_SAVES_SERVER_URL, rootState.auth.oauth)

      api.delete().then(async result => {
        if (result.ok) {
          commit(M_SET_STATUS_IDLE)
        } else {
          commit(M_SET_STATUS_ERROR, 'cannot delete game state. Status: ' + result.status)
          debug.log('API Error: ' + await result.text())
        }
      }, error => {
        commit(M_SET_STATUS_ERROR, 'cannot delete game state. (fetch error)')
        debug.log('API Error: ' + error)
      })
    }
  },
  restartGame: ({ commit }) => {
    commit(M_RESTART_GAME)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
