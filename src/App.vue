<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div v-if="!isGameCompleted && !isLvlFailed" class="game-container">
      <div class="mdl-grid" v-if="isGameNotRunning === false">
        <LeftPanel />
        <Board />
        <LevelCompletedDialog v-if="isLvlFinished" />
      </div>
    </div>
    <EndGameResult :totalPoints="totalPoints" v-if="isGameCompleted || isLvlFailed"/>
  </div>
</template>

<script>
import Board from './components/Board'
import Menu from './components/Menu'
import Scoreboard from './components/Scoreboard'
import LevelCompletedDialog from './components/LevelCompletedDialog'
import LeftPanel from './components/LeftPanel'
import EndGameResult from './components/EndGameResult'
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
      Board, Menu, Scoreboard, LevelCompletedDialog, LeftPanel, EndGameResult
  }
}
</script>

<style lang="scss">
  .sprite {
    background: transparent url('./assets/sprites.png') no-repeat top left;
  }

  body {
    text-align: center;
    background: url('./assets/background.png') no-repeat fixed top left;
    background-size: cover;
    //overflow: hidden;
  }

  .drop-shadow {
    filter: drop-shadow(2px 3px 2px #000);
  }

  .game-container {
    position: relative;
    top: 7vh;
  }

  @keyframes slide-from-up {
    0% {margin-top: -100%;}
    80% {margin-top: 0;}
    100% {margin-top: 0;}
  }

  @keyframes slide-to-down {
    0% {margin-top: 0;}
    80% {margin-top: 100%;}
    100% {margin-top: 100%;}
  }

  @keyframes vanishOut {
    0% {
      opacity: 1;
      transform-origin: 50% 50%;
      transform: scale(1, 1);
      filter: blur(0px);
    }

    100% {
      opacity: 0;
      transform-origin: 50% 50%;
      transform: scale(2, 2);
      filter: blur(10px);
    }
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
