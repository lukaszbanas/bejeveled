<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div v-if="!isGameCompleted && !isLvlFailed">
      <div class="game-container mdl-grid" v-if="isGameNotRunning === false">
        <LeftPanel />
        <Board />
        <LevelCompletedDialog v-if="isLvlFinished" />
      </div>
    </div>

    <div v-if="isGameCompleted || isLvlFailed">
      Thanks for playing! You scored <span>{{ totalPoints }}</span>!
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import Menu from './components/Menu'
import Scoreboard from './components/Scoreboard'
import LevelCompletedDialog from './components/LevelCompletedDialog'
import LeftPanel from './components/LeftPanel'
import store from './store'

export default {
  name: 'app',
  computed: {
      isGameNotRunning: () => {
          return store.state.game['running'] === false
      },
      isLvlFinished: () => {
          return store.state.game['finished'] === true && store.state.game['failed'] === false
      },
      isLvlFailed: () => {
          return store.state.game['finished'] === true && store.state.game['failed'] === true
      },
      isGameCompleted: () => {
          return store.state.progress['gameEnded'] === true
      },
      totalPoints: () => {
          return store.state.progress['score']
      }
  },
  components: {
      Board, Menu, Scoreboard, LevelCompletedDialog, LeftPanel
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
