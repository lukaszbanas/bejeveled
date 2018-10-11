/* eslint-disable no-unused-vars */
class GameTarget {
    constructor (params) {
        this.target = params
    }

    getTarget () {
        return this.target
    }

    isSatisfied (params) {
        throw new Error('Implementation is required');
    }
}

export { GameTarget }