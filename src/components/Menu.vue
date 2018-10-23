<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-offset">
      <div class="main-menu sprite">
        <button 
          class="sprite mdl-button mdl-js-button" 
          @click="startNewGame">New game</button>
        <button 
          v-if="logged" 
          class="sprite mdl-button mdl-js-button" 
          @click="loadGame">Load game</button>
        <router-link 
          to="/highscores" 
          class="sprite mdl-button mdl-js-button" 
          tag="button">Highscores</router-link>
        <OAuth />
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import OAuth from './OAuth'

  export default {
    name: "Menu",
    components: {
      OAuth
    },
    computed: {
      logged: () => {
        return store.state.auth.oauth !== null
      }
    },
    methods: {
      startNewGame: () => {
        store.dispatch('game/startNew')
        store.dispatch('board/generate')
      },
      loadGame: () => {
        store.dispatch('auth/getAuth')
        store.dispatch('progress/load')
        store.dispatch('game/startNew')
        store.dispatch('board/setLevel', store.state.progress.level)
      }
    },
  }
</script>

<style scoped lang="scss">
    .main-menu {
        width: 200px;
        height: 331px;
        margin: calc(50vh - 331px) auto auto auto;
        background-position: 0 -391px;
        padding-top: 111px;
        box-sizing: border-box;

        button {
            width: 200px;
            height: 50px;
            background-position: 0px -200px;
        }
    }
</style>