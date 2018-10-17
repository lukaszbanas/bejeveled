<template>
    <div>
        <router-view />
        <Notifier />
    </div>
</template>

<script>
    import RouteGame from './components/RouteGame'
    import Notifier from './components/Notifier'
    import store from './store'

    export default {
      name: 'app',
      components: {
          RouteGame, Notifier
      },
      beforeMount: function() {
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

  body {
    text-align: center;
    background: url('./assets/background.png') no-repeat fixed top left;
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
