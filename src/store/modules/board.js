import Vue from 'vue'
import Area from '../../classes/Area'
import {Gem, getAllTypes} from '../../classes/Gem'
import NullArea from "../../classes/NullArea";
import GameTargetFactory from "../../classes/GameTargetFactory";
import LvlHelperClass from "../../classes/LvlHelperClass";

const M_GENERATE = 'generate',
  M_DROP_FIELDS = 'drop_fields',
  M_CHECK_BOARD = 'check_board',
  M_SET_FALL_DIRECTION = 'set_fall_direction',
  M_REMOVE_GEMS = 'remove_gems',
  M_PREPARE_BOARD_FOR_MOVE = 'prepare_board_for_move',
  M_CLEANUP_BOARD_AFTER_MOVE = 'cleanup_board_after_move',
  M_MAKE_MOVE = 'make_move',
  M_CLICK_AT = 'click_at',
  M_SET_GAME_TARGET = 'set_game_target',
  M_MARK_BOARD_AS_PREPARED = 'mark_board_as_prepared',
  M_SET_MOVES_LIMIT = 'set_moves_limit',
  M_ADD_MOVE = 'add_move',
  M_SET_JSON_DATA = 'set_json_data'

const CONFIG_ANIMATION_SPEED = 300

const LvlHelper = new LvlHelperClass

const state = {
  board: [],
  rows: 0,
  cols: 0,
  boardPrepared: false,
  canMakeMove: true,
  pointsGained: 0,
  chain: 0,
  gemsToRemove: [],
  clickedArea: null,
  matchedGems: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  },
  gameTarget: null,
  currentMove: 0,
  jsonData: null
}

const getters = {
  /**
   * @param state
   * @returns {boolean}
   */
  hasEmptyFields: (state) => {
    let col, row, gems = 0

    for (col = state.cols - 1; col >= 0; col--) {
      for (row = state.rows - 1; row >= 0; row--) {
        if (state.board[row][col].getGem() !== null) {
          gems++
        }
      }
    }

    return gems !== (state.rows * state.cols)
  },
  /**
   * @param state
   * @returns {function(*): boolean}
   */
  isPositionContainsGemToRemove: state => (position) => {
    return typeof state.gemsToRemove.find((match) => {
      return match.x === position.x && match.y === position.y
    }) !== 'undefined'
  },

  gemCanFall: (state) => (position) => {
    let direction = state.board[position.y][position.x].getFallDirection(), targetRow, targetCol;

    switch (direction) {
      case 1: targetRow = position.y + 1; targetCol = position.x - 1; break;
      case 2: targetRow = position.y + 1; targetCol = position.x; break;
      case 3: targetRow = position.y + 1; targetCol = position.x + 1; break;
      case 4: targetRow = position.y; targetCol = position.x - 1; break;
      case 6: targetRow = position.y; targetCol = position.x + 1; break;
      case 7: targetRow = position.y - 1; targetCol = position.x - 1; break;
      case 8: targetRow = position.y - 1; targetCol = position.x; break;
      case 9: targetRow = position.y - 1; targetCol = position.x + 1; break;
    }

    return typeof state.board[targetRow] !== 'undefined' &&
      typeof state.board[targetRow][targetCol] !== 'undefined' &&
      state.board[targetRow][targetCol].getGem() === null
  },

  /**
   *
   * @param state
   * @returns {boolean}
   */
  hasClickedArea: (state) => {
    return state.clickedArea !== null
  },
  /**
   * @param state
   * @returns {null|*}
   */
  getClickedArea: (state) => {
    return state.clickedArea
  },
  isClickedArea: (state) => (position) => {
    return state.clickedArea !== null && state.clickedArea.x === position.x && state.clickedArea.y === position.y
  },
  getGameTarget: (state) => {
    return state.gameTarget
  },
  getMovesLeft: (state) => {
    try {
      return state.gameTarget.getMovesLimit() - state.currentMove
    } catch (e) {
      return 0
    }
  },
  getAnimationSpeed: () => {
    return CONFIG_ANIMATION_SPEED;
  },
  /**
   * @param state
   * @returns {*[]}
   */
  getDimensions: (state) => {
    return [state.rows, state.cols];
  }
}

const mutations = {
  [M_SET_JSON_DATA](state, payload) {
    state.jsonData = payload
  },
  [M_GENERATE](state) {
    state.rows = state.jsonData.board.length
    state.cols = state.jsonData.board[0].length
    state.boardPrepared = false

    for (let row = 0; row < state.rows; row++) {
      let temp = []

      for (let col = 0; col < state.cols; col++) {
        if (state.jsonData.board[row][col] === null) {
          temp[col] = new NullArea({'x': col, 'y': row}, 8)
        } else {
          temp[col] = new Area({'x': col, 'y': row}, state.jsonData.board[row][col].pull)
        }
      }

      Vue.set(state.board, row, temp)
    }

    state.boardPrepared = true
  },
  [M_DROP_FIELDS](state) {
    let row, col, finished = false, direction, gem

    state.emptyFields = 0

    while (finished === false) {
      for (col = state.cols - 1; col >= 0; col--) {
        for (row = state.rows - 1; row >= 0; row--) {

          if (!state.board[row][col].hasGem()) {
            if (row - 1 >= 0) {
              direction = state.board[row][col].getPullDirection();

              switch (direction) {
                case 1: gem = state.board[row + 1][col - 1].pullGem(); break
                case 2: gem = state.board[row + 1][col].pullGem(); break
                case 3: gem = state.board[row + 1][col + 1].pullGem(); break

                case 4: gem = state.board[row][col - 1].pullGem(); break
                case 6: gem = state.board[row][col + 1].pullGem(); break

                case 7: gem = state.board[row - 1][col - 1].pullGem(); break
                case 8: gem = state.board[row - 1][col].pullGem(); break
                case 9: gem = state.board[row - 1][col + 1].pullGem(); break
              }

              // old drop method
              // state.board[row][col].setGem(state.board[row - 1][col].pullGem())
              state.board[row][col].setGem(gem)
            } else {
              //its top row, generate new gem
              state.board[row][col].setGem(new Gem())
            }

            saveBoardToState(state)
            finished = true
          }
        }
      }
    }

    saveBoardToState(state)
  },
  [M_CHECK_BOARD](state, addPoints) {
    let row, col, matches

    state.gemsToRemove = []

    for (col = state.cols - 1; col >= 0; col--) {
      for (row = state.rows - 1; row >= 0; row--) {
        ['x', 'y'].forEach(direction => {
          matches = state.board[row][col].getMatch(state.board, direction)

          if (matches.length > 2) {
            if (state.boardPrepared && addPoints) {
              state.chain ++
              state.pointsGained += matches.length * state.chain
            }

            matches.forEach(match => {
              state.gemsToRemove.push(match)
            })
          }
        })
      }
    }
  },
  [M_REMOVE_GEMS](state) {
    state.gemsToRemove.forEach(match => {
      if (state.board[match.y][match.x].getGem() !== null && state.boardPrepared) {
        state.matchedGems[state.board[match.y][match.x].getGemType()]++
      }

      state.board[match.y][match.x].removeGem()
    })
  },
  [M_MAKE_MOVE](state, payload) {
    let gem1 = state.board[payload.first.y][payload.first.x].getGem(),
      gem2 = state.board[payload.second.y][payload.second.x].getGem()

    state.board[payload.first.y][payload.first.x].setGem(gem2)
    state.board[payload.second.y][payload.second.x].setGem(gem1)

    saveBoardToState(state)
  },
  [M_PREPARE_BOARD_FOR_MOVE](state) {
    state.pointsGained = 0
    state.emptyFields = 0
    state.canMakeMove = false
    state.clickedArea = null
    state.chain = 0;
  },
  [M_CLEANUP_BOARD_AFTER_MOVE](state) {
    state.canMakeMove = true
    state.chain = 0;
  },
  [M_CLICK_AT](state, payload) {
    state.clickedArea = payload
  },
  [M_SET_GAME_TARGET](state, payload) {
    state.gameTarget = payload
  },
  [M_MARK_BOARD_AS_PREPARED](state) {
    state.boardPrepared = true
    state.currentMove = 0
    state.chain = 0;
    state.matchedGems = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
  },
  [M_SET_MOVES_LIMIT](state, payload) {
    state.movesLimit = payload
  },
  [M_ADD_MOVE](state) {
    state.currentMove += 1
  },
  [M_SET_FALL_DIRECTION] (state) {
    let row, col, targetRow, targetCol, direction

    for (col = state.cols - 1; col >= 0; col--) {
      for (row = state.rows - 1; row >= 0; row--) {
        switch (state.board[row][col].getPullDirection()) {
          case 1: targetRow = row + 1; targetCol = col + 1; direction = 9; break;
          case 2: targetRow = row + 1; targetCol = col; direction = 8; break;
          case 3: targetRow = row + 1; targetCol = col - 1; direction = 7; break;
          case 4: targetRow = row; targetCol = col - 1; direction = 6; break;
          case 6: targetRow = row; targetCol = col + 1; direction = 4; break;
          case 7: targetRow = row - 1; targetCol = col - 1; direction = 3; break;
          case 8: targetRow = row - 1; targetCol = col; direction = 2; break;
          case 9: targetRow = row - 1; targetCol = col + 1; direction = 1; break;
        }

        if (typeof state.board[targetRow] !== 'undefined' &&
          typeof state.board[targetRow][targetCol] !== 'undefined' &&
          state.board[targetRow][targetCol] instanceof Area) {
          state.board[targetRow][targetCol].setFallDirection(direction)
        }
      }
    }
  }
}

const actions = {
  generate: async ({commit, dispatch, rootState, state}) => {
    commit(M_SET_JSON_DATA, await LvlHelper.getJsonData(rootState.progress.level))
    commit(M_GENERATE)
    commit(M_SET_GAME_TARGET, new GameTargetFactory(state.jsonData.type, state.jsonData.props, state.jsonData.moves))
    commit(M_SET_FALL_DIRECTION)

    await dispatch('checkBoard', 0)

    while (getters.hasEmptyFields(state)) {
      await dispatch('dropFields')
      await dispatch('checkBoard', 0)
    }

    for (let x=0; x<=10; x++) {
      await dispatch('checkIfBoardHasAnyMoves')
    }

    commit(M_MARK_BOARD_AS_PREPARED)
  },
  setLevel: async ({dispatch}) => {
    dispatch('generate')
  },
  dropFields: async ({commit}) => {
    commit(M_DROP_FIELDS)
  },
  checkBoard: async ({commit}, animationSpeed) => {
    commit(M_CHECK_BOARD, true)
    await wait(animationSpeed * .68)
    commit(M_REMOVE_GEMS)
  },
  checkIfBoardHasAnyMoves: async ({commit, state, dispatch}) => {
    let col, row, hasMatch = false, virtualGem, matchesX, matchesY

    for (col = state.cols - 1; col >= 0; col--) {
      for (row = state.rows - 1; row >= 0; row--) {
        getAllTypes().forEach(type => {
          virtualGem = new Gem(type);
          matchesX = state.board[row][col].getMatchInAllDirections(state.board, 'x', virtualGem)
          matchesY = state.board[row][col].getMatchInAllDirections(state.board, 'y', virtualGem)

          if (!(state.board[row][col] instanceof NullArea) && (matchesX.length + matchesY.length) >= 5) {
            hasMatch = true
          }
        })
      }
    }

    if (!hasMatch) {
      commit(M_GENERATE)
      await dispatch('checkBoard', 0)

      while (getters.hasEmptyFields(state)) {
        await dispatch('dropFields')
        await dispatch('checkBoard', 0)
      }

      commit(M_MARK_BOARD_AS_PREPARED)
    }
  },
  revertMove: ({commit}, positions) => {
    commit(M_MAKE_MOVE, positions)
  },
  makeMove: async ({commit, dispatch, rootState}, positions) => {
    return new Promise(async (resolve, reject) => {
      commit(M_PREPARE_BOARD_FOR_MOVE)
      commit(M_MAKE_MOVE, positions)

      //checking if move is possible
      commit(M_CHECK_BOARD, false)

      if (state.gemsToRemove.length === 0) {
        commit(M_CLEANUP_BOARD_AFTER_MOVE)
        reject()
        return;
      }

      commit(M_ADD_MOVE)

      await dispatch('checkBoard', CONFIG_ANIMATION_SPEED)

      while (getters.hasEmptyFields(state)) {
        await dispatch('dropFields')
        await dispatch('checkBoard', CONFIG_ANIMATION_SPEED)
      }

      dispatch('checkIfBoardHasAnyMoves')

      commit(M_CLEANUP_BOARD_AFTER_MOVE)

      dispatch('game/addScore', state.pointsGained, {root: true})
      dispatch('progress/storeScore', null, {root: true})

      if (state.gameTarget.isSatisfied({
        'score': rootState.game.score,
        'match-type-1': state.matchedGems[1],
        'match-type-2': state.matchedGems[2],
        'match-type-3': state.matchedGems[3],
        'match-type-4': state.matchedGems[4],
        'match-type-5': state.matchedGems[5]
      })) {
        dispatch('game/finishLevel', null, {root: true})
      }

      if (state.gameTarget.getMovesLimit() - state.currentMove <= 0) {
        dispatch('game/failLevel', null, {root: true})
      }

      resolve()
    })
  },
  clickAtArea: ({commit}, position) => {
    commit(M_CLICK_AT, position)
  }
}

/** internal function for propagation state changes across components */
const saveBoardToState = (state) => {
  for (let [rowIndex, row] of state.board) {
    Vue.set(state.board, rowIndex, row)
  }
}

/**
 *
 * @param ms
 * @returns {Promise<*>}
 */
const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
