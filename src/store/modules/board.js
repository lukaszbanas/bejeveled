import Vue from 'vue'

const M_GENERATE = 'generate'

const state = {
    board: [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ],
    rows: 10,
    cols: 10
}

const getters = {
}

const mutations = {
    [M_GENERATE] (state, payload) {
        state.rows = payload.rows
        state.cols = payload.cols

        for (let row = 0; row < state.rows; row++) {
            let temp = []

            for (let col = 0; col < state.cols; col++) {
                temp[col] = null
            }

            Vue.set(state.board, row, temp)
        }
    }
}

const actions = {
    generate: ({ commit }) => {
        commit(M_GENERATE, {rows: 10, cols: 10});
    }
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}