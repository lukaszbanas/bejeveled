<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <div v-if="isGameNotRunning === false">
      <Scoreboard :score="$store.state.game.score" />
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

<style>
  .sprite {
    background: transparent url('./assets/sprites.png') no-repeat top left;
  }

  body {
    text-align: center;
  }
</style>
