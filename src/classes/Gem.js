const TYPE_1 = 1,
    TYPE_2 = 2,
    TYPE_3 = 3,
    TYPE_4 = 4,
    TYPE_5 = 5

class Gem {
    constructor() {
        let types = [TYPE_1, TYPE_2, TYPE_3, TYPE_4, TYPE_5]
        this.type = types[Math.floor(Math.random() * types.length)];
    }

    getType() {
        return this.type
    }
}

export default Gem