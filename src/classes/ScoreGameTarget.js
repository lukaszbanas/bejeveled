import {GameTarget} from './GameTarget'

class ScoreGameTarget extends GameTarget {
    constructor (params) {
        super(params)
    }

    getScore () {
        return this.getTarget()['score']
    }

    isSatisfied(params) {
        return params.score >= this.getScore()
    }
}

export default ScoreGameTarget