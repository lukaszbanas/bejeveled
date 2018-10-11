import Vuex from 'vuex'
import Vue from 'vue'
import game from './modules/game'
import board from './modules/board'
import progress from './modules/progress'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game, board, progress
    }
})