<template>
  <div :style="cssProps">
    <router-view />
    <Notifier />
  </div>
</template>

<script>
  import RouteGame from './components/RouteGame'
  import Notifier from './components/Notifier'
  import store from './store'

  export default {
    name: 'App',
    components: {
      RouteGame, Notifier
    },
    computed: {
      cssProps() { return {
        '--animation-speed': this.$store.getters['board/getAnimationSpeed'] + 'ms',
        '--board-rows': this.$store.getters['board/getDimensions'][0],
        '--board-cols': this.$store.getters['board/getDimensions'][1]
      }}
    },
    beforeMount: function () {
      if (window.localStorage) {
        store.dispatch('auth/setOauth',
          {
            name: window.localStorage.getItem('oauth_name'),
            token: JSON.parse(window.localStorage.getItem('oauth_token'))
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  .sprite {
    background: transparent url('./assets/sprites.png') no-repeat top left;
  }

  .sprite--gem {
    display: inline-block;
    background: url('./assets/sprites-gems.png') no-repeat;
    overflow: hidden;
    text-indent: -9999px;
    text-align: left;
    background-size: 151px;
  }

  body {
    text-align: center;
    background: url('./assets/bg.jpg') no-repeat fixed top left;
    background-size: cover;
    //overflow: hidden;
  }

  .drop-shadow {
    filter: drop-shadow(2px 3px 2px #000);
  }

  .go-back-button {
    background-position: 0 -200px;
    height: 51px;
    width: 200px;;
  }

  @keyframes slide-from-1 {
    0% {margin-bottom: -100%; margin-left: -100%;}
    80% {margin-bottom: 0; margin-left: 0;}
    100% {margin-bottom: 0; margin-left: 0;}
  }

  @keyframes slide-from-2 {
    0% {margin-bottom: -100%;}
    80% {margin-bottom: 0;}
    100% {margin-bottom: 0;}
  }

  @keyframes slide-from-3 {
    0% {margin-bottom: -100%; margin-right: -100%;}
    80% {margin-bottom: 0; margin-right: 0;}
    100% {margin-bottom: 0; margin-right: 0;}
  }

  @keyframes slide-from-4 {
    0% {margin-left: -100%;}
    80% {margin-left: 0;}
    100% {margin-left: 0;}
  }

  @keyframes slide-from-6 {
    0% {margin-right: -100%;}
    80% {margin-right: 0;}
    100% {margin-right: 0;}
  }

  @keyframes slide-from-7 {
    0% {margin-top: -100%; margin-left: -100%;}
    80% {margin-top: 0; margin-left: 0;}
    100% {margin-top: 0; margin-left: 0;}
  }

  @keyframes slide-from-8 {
    0% {margin-top: -100%;}
    80% {margin-top: 0;}
    100% {margin-top: 0;}
  }

  @keyframes slide-from-9 {
    0% {margin-top: -100%; margin-right: -100%;}
    80% {margin-top: 0; margin-right: 0;}
    100% {margin-top: 0; margin-right: 0;}
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

  .show-chain-enter-active {
    animation: bounce-in .5s;
  }
  .show-chain-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
