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
    debug.log('open')
  },
  SOCKET_ONCLOSE(state) {
    state.socket.isConnected = false
    debug.log('onclose')
  },
  SOCKET_ONERROR(state, event) {
    debug.log(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    debug.log(state, count)
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
}

const actions = {
  // eslint-disable-next-line no-empty-pattern
  postScore: ({}, payload) => {
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