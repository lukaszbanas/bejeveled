import SavesApi from '../../classes/SavesApi'
import * as debug from "debug";

const
  M_INCREASE_LEVEL = 'increase_level',
  M_STORE_SCORE = 'store_score',
  M_END_GAME = 'end_game',
  M_SET_STATUS_IDLE = 'set_status_idle',
  M_SET_STATUS_WORKING = 'set_status_working',
  M_SET_STATUS_ERROR = 'set_status_error',
  M_LOAD = 'load'

const state = {
  level: 1,
  score: 0,
  maxLvl: 5,
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
        'data': {
          'game': rootState.game,
          'progress': rootState.progress
        }
      }).then(async result => {
        result.json().then(jsonResult => {
          if (result.ok) {
            dispatch('game/setHash', jsonResult.data, {root: true})
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
            let json = JSON.parse(compiled.data)
            dispatch('game/load', json.data.game, {root: true})
            dispatch('game/setHash', compiled.hash, {root: true})

            if (typeof json.data.progress !== 'undefined') {
              commit(M_LOAD, json.data.progress)
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
          alert('deleted')

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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}