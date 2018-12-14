<template>
  <div class="scoreboard-container sprite">
    <div class="scoreboard sprite mdl-cell mdl-cell--4-col drop-shadow">
      <span>{{ score }}</span>
    </div>
    <div 
      v-if="isMatchGemsGameTarget" 
      class="matched-gems-counter-container">
      <MatchedGemCounter 
        v-if="game_type.getTargetFirst() !== null" 
        :type="1" 
        :matched="matched_first" 
        :target="game_type.getTargetFirst()" />
      <MatchedGemCounter 
        v-if="game_type.getTargetSecond() !== null" 
        :type="2" 
        :matched="matched_second" 
        :target="game_type.getTargetSecond()" />
      <MatchedGemCounter 
        v-if="game_type.getTargetThird() !== null" 
        :type="3" 
        :matched="matched_third" 
        :target="game_type.getTargetThird()" />
      <MatchedGemCounter 
        v-if="game_type.getTargetFourth() !== null" 
        :type="4" 
        :matched="matched_fourth" 
        :target="game_type.getTargetFourth()" />
      <MatchedGemCounter 
        v-if="game_type.getTargetFifth() !== null" 
        :type="5" 
        :matched="matched_fifth" 
        :target="game_type.getTargetFifth()" />
    </div>
    <div 
      v-if="isScoreGameTarget" 
      class="target-score-counter-container">
      <TargetScoreCounter 
        :matched="$store.state.game.score" 
        :target="game_type.getScore()" />
    </div>
  </div>
</template>

<script>
  import MatchGemsGameTarget from '../classes/MatchGemsGameTarget'
  import ScoreGameTarget from '../classes/ScoreGameTarget'
  import MatchedGemCounter from './MatchedGemCounter'
  import TargetScoreCounter from './TargetScoreCounter'
  import {GameTarget} from "../classes/GameTarget";

  export default {
    name: 'Scoreboard',
    components: {
      MatchedGemCounter, TargetScoreCounter
    },
    props: {
      score: {
        type: Number,
        default: 0
      },
      game_type: {
        type: GameTarget | null,
        default: null
      },
      matched_first: {
        type: Number,
        default: 0
      },
      matched_second: {
        type: Number,
        default: 0
      },
      matched_third: {
        type: Number,
        default: 0
      },
      matched_fourth: {
        type: Number,
        default: 0
      },
      matched_fifth: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isMatchGemsGameTarget() {
        return this.game_type !== null && this.game_type instanceof MatchGemsGameTarget
      },
      isScoreGameTarget() {
        return this.game_type !== null && this.game_type instanceof ScoreGameTarget
      }
    },
  }
</script>

<style scoped lang="scss">
    .scoreboard-container {
        background-position: -200px -111px;
        height: 331px;
        padding: 5px 10px 10px;
        box-sizing: border-box;
        filter: drop-shadow(1px 1px 21px black)
    }

    .scoreboard {
        width: 148px;
        background-position: -200px -605px;
        height: 37px;
        padding: 0 10px 0 40px;
        line-height: 34px;
        color: #ddc124;
        font-size: 18px;
        text-align: left;
    }
</style>