/* eslint-disable no-unused-vars */
class GameTarget {
  constructor(params, moves) {
    this.target = params
    this.movesLimit = moves
  }

  getTarget() {
    return this.target
  }

  isSatisfied(params) {
    throw new Error('Implementation is required');
  }

  getMovesLimit() {
    return this.movesLimit
  }
}

export {GameTarget}