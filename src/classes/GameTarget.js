const GAME_TARGET_TYPE_1 = 'match_gems'

class GameTarget {
    constructor (type, params) {
        this.type = type

        if (type === GAME_TARGET_TYPE_1) {
            this.target = params
        }
    }

    getTarget () {
        return this.target
    }
}

export { GameTarget, GAME_TARGET_TYPE_1 }