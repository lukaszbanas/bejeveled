import MatchGemsGameTarget from "./MatchGemsGameTarget";
import ScoreGameTarget from "./ScoreGameTarget";

/**
 *
 * @param type
 * @param params
 * @param moves
 * @returns {MatchGemsGameTarget|ScoreGameTarget}
 * @constructor
 */
const GameTargetFactory = (type, params, moves) => {
  if (type === 'MatchGemsGameTarget') {
    return new MatchGemsGameTarget(params, moves)
  } else if (type === 'ScoreGameTarget') {
    return new ScoreGameTarget(params, moves)
  }

  throw new Error('No game target found')
}

export default GameTargetFactory