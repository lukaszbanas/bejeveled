import {GameTarget} from './GameTarget'

class ScoreGameTarget extends GameTarget {
  constructor(params, moves) {
    super(params, moves)
  }

  getScore() {
    return this.getTarget()['score']
  }

  isSatisfied(params) {
    return params.score >= this.getScore()
  }
}

export default ScoreGameTarget