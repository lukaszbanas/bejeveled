<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div v-if="!isGameEnded">
      <div class="game-container mdl-grid" v-if="isGameNotRunning === false">
        <Scoreboard
                :score="$store.state.progress.score"
                :matched_first="$store.state.board.matchedGems[1]"
                :matched_second="$store.state.board.matchedGems[2]"
                :matched_third="$store.state.board.matchedGems[3]"
                :matched_fourth="$store.state.board.matchedGems[4]"
                :matched_fifth="$store.state.board.matchedGems[5]"
                :game_type="$store.state.board.gameTarget"
        />
        <Board />
        <LevelCompletedDialog v-if="isLvlFinished" />
      </div>
    </div>
    <div v-if="isGameEnded">
      Thanks for playing! You scored <span>{{ totalPoints }}</span>!
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import Menu from './components/Menu'
import Scoreboard from './components/Scoreboard'
import LevelCompletedDialog from './components/LevelCompletedDialog'
import store from './store'

export default {
  name: 'app',
  computed: {
      isGameNotRunning: () => {
          return store.state.game['running'] === false
      },
      isLvlFinished: () => {
          return store.state.game['finished'] === true
      },
      isGameEnded: () => {
          return store.state.progress['gameEnded'] === true
      },
      totalPoints: () => {
          return store.state.progress['score']
      }
  },
  components: {
      Board, Menu, Scoreboard, LevelCompletedDialog
  }
}
</script>

<style lang="scss">
  .sprite {
    background: transparent url('./assets/sprites.png') no-repeat top left;
  }

  body {
    text-align: center;
  }

  .game-container {
    width: 100vw;
  }

  .drop-shadow {
    filter: drop-shadow(2px 3px 2px #000);
  }
</style>
