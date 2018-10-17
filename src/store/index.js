import Vuex from 'vuex'
import Vue from 'vue'
import game from './modules/game'
import board from './modules/board'
import progress from './modules/progress'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game, board, progress, auth
    }
})