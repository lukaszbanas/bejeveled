import {GameTarget} from './GameTarget'

class ScoreGameTarget extends GameTarget {
  /**
   * @inheritDoc
   * @param params
   * @param moves
   */
  constructor(params, moves) {
    super(params, moves)
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.getTarget()['score']
  }

  /**
   * @param params
   * @returns {boolean}
   */
  isSatisfied(params) {
    return params.score >= this.getScore()
  }
}

export default ScoreGameTarget
