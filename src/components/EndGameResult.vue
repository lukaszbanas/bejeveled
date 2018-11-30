<template>
  <div class="end-game-result sprite">
    <span class="end-game-result__title">Thanks for playing!</span>You scored <span class="end-game-result__score">{{ totalPoints }}</span> points!
    <div
      v-if="isSent === false"
      class="send-results"
    >
      <div class="mdl-textfield mdl-js-textfield">
        <label
          class="mdl-textfield__label"
          for="send-results-nick">Your name: (max 16)</label>
        <input
          id="send-results-nick"
          v-model="nick"
          type="text"
          name="nick"
          maxlength="16"
          class="mdl-textfield__input"
        >
      </div>
      <button
        class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
        @click="sendHighscore"
      >Post highscores</button>
    </div>
    <button
      type="button"
      class="mdl-button mdl-js-button mdl-button--raised"
      @click="backToMenu">Back to menu</button>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    name: 'EndGameResult',
    props: {
      totalPoints: {
        type: Number,
        default: 0
      },
      isSent: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        nick: (store.state.auth.loggedAs !== null) ? store.state.auth.loggedAs : 'Anonymous'
      }
    },
    methods: {
      sendHighscore: function () {
        store.dispatch('ws/postScore', {
          name: this.nick,
          score: store.state.progress.score
        })
        this.isSent = true
      },
      backToMenu: () => {
          store.dispatch('game/endGame')
          store.dispatch('progress/restartGame')
      }
    }
  }
</script>

<style scoped>
    .end-game-result{
        position: relative;
        top:calc(45vh);
        width: 200px;
        height: 51px;
        line-height: 48px;
        margin: 0 auto;
        background-position: 0 -200px;
    }

    .end-game-result__title {
        position: absolute;
        top: -38px;
        left: 30px;
        font-size: larger;
    }

    .end-game-result__score {
        color: #ddc124
    }

  .mdl-textfield__label {
    top: initial;
    bottom: -16px;
  }
</style>
