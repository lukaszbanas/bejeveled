<template>
  <div class="end-game-result sprite">
    <span class="end-game-result__title">Thanks for playing!</span>You scored <span class="end-game-result__score">{{ totalPoints }}</span> points!
  </div>
</template>

<script>
  export default {
    name: 'EndGameResult',
    props: {
      totalPoints: {
        type: Number,
        default: 0
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
</style>