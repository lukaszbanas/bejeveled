/* eslint-disable no-unused-vars */
class GameTarget {
  /**
   * @param {*} params
   * @param {number} moves
   */
  constructor(params, moves) {
    this.target = params
    this.movesLimit = moves
  }

  /**
   * @returns {*}
   */
  getTarget() {
    return this.target
  }

  /**
   * @param params
   */
  isSatisfied(params) {
    throw new Error('Implementation is required');
  }

  /**
   * @returns {number}
   */
  getMovesLimit() {
    return this.movesLimit
  }
}

export {GameTarget}
