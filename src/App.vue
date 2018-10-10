<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div class="game-container mdl-grid" v-if="isGameNotRunning === false">
      <Scoreboard
          :score="$store.state.game.score"
          :matched_first="$store.state.board.matchedGems[1]"
          :matched_second="$store.state.board.matchedGems[2]"
          :matched_third="$store.state.board.matchedGems[3]"
          :matched_fourth="$store.state.board.matchedGems[4]"
          :matched_fifth="$store.state.board.matchedGems[5]"
      />
      <Board />
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import Menu from './components/Menu'
import Scoreboard from './components/Scoreboard'
import store from './store'

export default {
  name: 'app',
  computed: {
      isGameNotRunning: () => {
          return store.state.game['running'] === false
      }
  },
  components: {
      Board, Menu, Scoreboard
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
</style>
