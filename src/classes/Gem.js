const TYPE_1 = 1,
  TYPE_2 = 2,
  TYPE_3 = 3,
  TYPE_4 = 4,
  TYPE_5 = 5

class Gem {
  constructor(forcedType = 0) {
    let types = [TYPE_1, TYPE_2, TYPE_3, TYPE_4, TYPE_5]

    if (forcedType === 0) {
      this.type = types[Math.floor(Math.random() * types.length)];
    } else {
      this.type = forcedType
    }
  }

  getType() {
    return this.type
  }
}

function getAllTypes () {
  return [TYPE_1, TYPE_2, TYPE_3, TYPE_4, TYPE_5]
}

export {Gem, getAllTypes}