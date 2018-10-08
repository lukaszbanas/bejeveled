<template>
  <div id="app">
    <Menu v-if="isGameNotRunning === true"/>
    <Board v-if="isGameNotRunning === false" />
  </div>
</template>

<script>
import Board from './components/Board'
import Menu from './components/Menu'
import store from './store'

export default {
  name: 'app',
  computed: {
      isGameNotRunning: () => {
          return store.state.game['running'] === false
      }
  },
  components: {
      Board, Menu
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
