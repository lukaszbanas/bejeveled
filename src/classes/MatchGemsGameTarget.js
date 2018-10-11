import {GameTarget} from './GameTarget'

export default class MatchGemsGameTarget extends GameTarget {
    constructor (params, moves) {
        super(params, moves)
    }

    getTargetFirst () {
        return this._getTarget(1)
    }

    getTargetSecond () {
        return this._getTarget(2)
    }

    getTargetThird () {
        return this._getTarget(3)
    }

    getTargetFourth () {
        return this._getTarget(4)
    }

    getTargetFifth () {
        return this._getTarget(5)
    }

    _getTarget(type) {
        return (typeof this.getTarget()[type] !== 'undefined' ? this.getTarget()[type] : null)
    }

    isSatisfied(params) {
        let result1 = false, result2 = false, result3 = false, result4 = false, result5 = false

        if ((this.getTargetFirst() !== null && this.getTargetFirst() <= params['match-type-1']) || this.getTargetFirst() === null) {
            result1 = true
        }

        if ((this.getTargetSecond() !== null && this.getTargetSecond() <= params['match-type-2']) || this.getTargetSecond() === null) {
            result2 = true
        }

        if ((this.getTargetThird() !== null && this.getTargetThird() <= params['match-type-3']) || this.getTargetThird() === null) {
            result3 = true
        }

        if ((this.getTargetFourth() !== null && this.getTargetFourth() <= params['match-type-4']) || this.getTargetFourth() === null) {
            result4 = true
        }

        if ((this.getTargetFifth() !== null && this.getTargetFifth() <= params['match-type-5']) || this.getTargetFifth() === null) {
            result5 = true
        }

        return result1 && result2 && result3 && result4 && result5
    }
}