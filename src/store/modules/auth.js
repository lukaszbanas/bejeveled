import Vue from 'vue'
import * as debug from "debug";

const
  M_SET_OAUTH = 'set_oauth'

const state = {
  oauth: null,
  loggedAs: null
}

const getters = {}

const mutations = {
  [M_SET_OAUTH](state, payload) {
    state.oauth = payload.token
    state.loggedAs = payload.name
  }
}

const actions = {
  setOauth: ({commit}, payload) => {
    commit(M_SET_OAUTH, payload)
  },
  getAuth: ({dispatch}) => {
    Vue.googleAuth().directAccess()
    Vue.googleAuth().signIn(googleUser => {
      if (window.localStorage) {
        window.localStorage.setItem('oauth_name', googleUser.getBasicProfile().getName())
        window.localStorage.setItem('oauth_token', JSON.stringify(googleUser.getAuthResponse()))
      }

      dispatch('setOauth', {token: googleUser.getAuthResponse(), name: googleUser.getBasicProfile().getName()})

    }, error => {
      debug.log('GOOGLE SERVER - SIGN-IN ERROR', error)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
