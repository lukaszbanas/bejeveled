import {Gem} from './Gem'

/**
 * @param {Object[]} array
 * @param {Object} position
 * @returns {boolean}
 * @TODO move to helper class
 */
const notContains = (array, position) => {
  let result = true, i = 0

  for (i; i < array.length; i++) {
    if (array[i].x === position.x && array[i].y === position.y) {
      result = false
      break
    }
  }

  return result
}

/**
 * @param {number} newX
 * @param {number} newY
 * @param {[]} board
 * @param {Gem} gem
 * @returns {*|boolean}
 * @TODO move to helper class
 */
const testField = (newX, newY, board, gem) => {
  return (fieldExists(newX, newY, board) &&
    board[newY][newX].getGem() !== null &&
    gem !== null &&
    board[newY][newX].getGemType() === gem.getType()
  )
}

/**
 * @param {number} newX
 * @param {number} newY
 * @param {Object} board
 * @returns {boolean}
 * @TODO move to helper class
 */
const fieldExists = (newX, newY, board) => {
  return (typeof board[newY] !== 'undefined' && typeof board[newY][newX] !== 'undefined')
}

export default class Area {
  /**
   * @param {Object} position
   * @param {number} pullDirection
   */
  constructor(position, pullDirection) {
    /** @type {Gem|null} */
    this.gem = new Gem()
    /** @type {Object} */
    this.position = position
    /** @type {number} */
    this.pullDirection = pullDirection
    /** @type {number} */
    this.fallDirection = 8
  }

  /**
   * @param {Gem|null} gem
   */
  setGem(gem) {
    this.gem = gem
  }

  /**
   * @returns {Gem|null}
   */
  getGem() {
    return this.gem
  }

  /**
   * @returns {number}
   */
  getGemType() {
    return this.gem.getType()
  }

  /**
   * Clears and returns current gem
   * @returns {Gem}
   */
  pullGem() {
    let gem = this.gem;
    this.removeGem()

    return gem
  }

  /**
   * @returns {boolean}
   */
  hasGem() {
    return this.gem !== null
  }

  removeGem() {
    this.gem = null
  }

  /**
   * @param {Array} board
   * @param {string} type
   * @param {Gem|null} gem
   * @returns {Array}
   */
  getMatchInAllDirections(board, type, gem = null) {
    let matches = []

    if (gem === null) {
      gem = this.getGem()
    }

    if (notContains(matches, this)) {
      matches.push({'x': this.position.x, 'y': this.position.y})
    }

    if (type === 'x') {
      let keepSearch = true, x = this.position.x

      while (keepSearch) {
        x = x - 1

        if (testField(x, this.position.y, board, gem)) {
          matches.push({'x': x, 'y': this.position.y})
        } else {
          keepSearch = false
        }
      }

      keepSearch = true
      x = this.position.x

      while (keepSearch) {
        x = x + 1

        if (testField(x, this.position.y, board, gem)) {
          matches.push({'x': x, 'y': this.position.y})
        } else {
          keepSearch = false
        }
      }
    } else {
      let keepSearch = true, y = this.position.y

      while (keepSearch) {
        y = y - 1

        if (!testField(this.position.x, y, board, gem)) {
          keepSearch = false
        } else {
          matches.push({'x': this.position.x, 'y': y})
        }
      }

      keepSearch = true
      y = this.position.y

      while (keepSearch) {
        y = y + 1

        if (!testField(this.position.x, y, board, gem)) {
          keepSearch = false
        } else {
          matches.push({'x': this.position.x, 'y': y})
        }
      }
    }

    return matches
  }

  /**
   * @param {Array} board
   * @param {string} type
   * @param {Gem|null} gem
   * @returns {Array}
   */
  getMatch(board, type, gem = null) {
    let matches = []

    if (gem === null) {
      gem = this.getGem()
    }

    if (notContains(matches, this)) {
      matches.push({'x': this.position.x, 'y': this.position.y})
    }

    if (type === 'x') {
      let keepSearch = true, x = this.position.x

      while (keepSearch) {
        x = x - 1

        if (testField(x, this.position.y, board, gem)) {
          matches.push({'x': x, 'y': this.position.y})
        } else {
          keepSearch = false
        }
      }
    } else {
      let keepSearch = true, y = this.position.y

      while (keepSearch) {
        y = y - 1

        if (!testField(this.position.x, y, board, gem)) {
          keepSearch = false
        } else {
          matches.push({'x': this.position.x, 'y': y})
        }
      }
    }

    return matches
  }

  /**
   * @returns {number}
   */
  getPullDirection () {
    return this.pullDirection
  }

  /**
   * @param {number} direction
   */
  setFallDirection (direction) {
    this.fallDirection = direction
  }

  /**
   * @returns {number}
   */
  getFallDirection () {
    return this.fallDirection
  }
}
