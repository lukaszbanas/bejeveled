import Vue from 'vue'
import * as debug from "debug";

const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  }
}

const getters = {}

const mutations = {
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE(state) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR(state, event) {
    debug.log(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  // eslint-disable-next-line
  SOCKET_RECONNECT(state, count) {
    //silent
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
}

const actions = {
  // eslint-disable-next-line no-empty-pattern
  postScore: ({ state, commit }, payload) => {
    if (state.socket.isConnected === false) {
        commit('SOCKET_RECONNECT')
    }

    Vue.prototype.$socket.send(JSON.stringify(payload))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
