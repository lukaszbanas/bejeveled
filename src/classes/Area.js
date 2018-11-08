import Gem from './Gem'

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

const testField = (newX, newY, board, gem) => {
  return (fieldExists(newX, newY, board) &&
    board[newY][newX].getGem() !== null &&
    gem !== null &&
    board[newY][newX].getGemType() === gem.getType()
  )
}

const fieldExists = (newX, newY, board) => {
  return (typeof board[newY] !== 'undefined' && typeof board[newY][newX] !== 'undefined')
}

export default class Area {

  constructor(position, pullDirection) {
    this.gem = new Gem()
    this.position = position
    this.pullDirection = pullDirection
  }

  setGem(gem) {
    this.gem = gem
  }

  getGem() {
    return this.gem
  }

  getGemType() {
    return this.gem.getType()
  }

  pullGem() {
    let gem = this.gem;
    this.gem = null

    return gem
  }

  hasGem() {
    return this.gem !== null
  }

  removeGem() {
    this.gem = null
  }

  getMatch(board, type, matches) {
    if (typeof matches === 'undefined') {
      matches = []
    }

    if (notContains(matches, this)) {
      matches.push({'x': this.position.x, 'y': this.position.y})
    }

    if (type === 'x') {
      let keepSearch = true, x = this.position.x

      while (keepSearch) {
        x = x - 1

        if (testField(x, this.position.y, board, this.getGem())) {
          matches.push({'x': x, 'y': this.position.y})
        } else {
          keepSearch = false
        }
      }
    } else {
      let keepSearch = true, y = this.position.y

      while (keepSearch) {
        y = y - 1

        if (!testField(this.position.x, y, board, this.getGem())) {
          keepSearch = false
        } else {
          matches.push({'x': this.position.x, 'y': y})
        }
      }
    }

    return matches
  }

  getPullDirection () {
    return this.pullDirection
  }
}