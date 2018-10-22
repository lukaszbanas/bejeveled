<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div 
      v-if="!isGameCompleted && !isLvlFailed" 
      class="game-container">
      <div 
        v-if="isGameNotRunning === false" 
        class="mdl-grid">
        <div class="game-container-inner">
          <LeftPanel />
          <Board />
          <LevelCompletedDialog v-if="isLvlFinished" />
        </div>
      </div>
    </div>
    <EndGameResult 
      v-if="isGameCompleted || isLvlFailed" 
      :total-points="totalPoints"
    />
  </div>
</template>

<script>
  import store from '../store'
  import Board from '../components/Board'
  import Menu from '../components/Menu'
  import Scoreboard from '../components/Scoreboard'
  import LevelCompletedDialog from '../components/LevelCompletedDialog'
  import LeftPanel from '../components/LeftPanel'
  import EndGameResult from '../components/EndGameResult'

  export default {
    name: 'RouteGame',
    components: {
      Board, Menu, Scoreboard, LevelCompletedDialog, LeftPanel, EndGameResult
    },
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
  }
</script>

<style scoped>
    .game-container > .mdl-grid {
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
    }

    .game-container-inner {
        width: 100%;
        margin-top: 70px;
        display: grid;
        grid-template-columns: calc(50vw - 400px) auto;
    }
</style>