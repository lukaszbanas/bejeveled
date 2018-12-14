<template>
  <div
    :class="conditionalClass"
    class="matched-gem-counter sprite drop-shadow">
    <div class="sprite sprite--gem matched-gem-counter__icon"/>
    <span>{{ matched > target ? target : matched }}</span>/<span>{{ target }}</span>
  </div>
</template>

<script>
  export default {
    name: 'MatchedGemCounter',
    props: {
      type: {
        type: String|Number,
        default: ''
      },
      matched: {
        type: Number,
        default: 0
      },
      target: {
        type: Number,
        default: 0
      }
    },
    computed: {
      conditionalClass() {
        return {
          'matched-gem-counter--first': this.type === 1,
          'matched-gem-counter--second': this.type === 2,
          'matched-gem-counter--third': this.type === 3,
          'matched-gem-counter--fourth': this.type === 4,
          'matched-gem-counter--fifth': this.type === 5,
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    .matched-gem-counter {
        background-position: -348px -681px;
        width: 137px;
        height: 37px;
        line-height: 35px;
        margin-left: 20px;
        position: relative;

        & + .matched-gem-counter {
            margin-top: 10px
        }
    }

    .matched-gem-counter__icon {
        position: absolute;
        left: -10px;
        top: -10px;
        transform: scale(.6) rotate(20deg);
    }

    .matched-gem-counter--first {
        .matched-gem-counter__icon{
          background-position: 0 0;
          width: 73px;
          height: 73px;
        }
    }

    .matched-gem-counter--second {
        .matched-gem-counter__icon{
          background-position: -76px 0;
          width: 73px;
          height: 73px;
        }
    }

    .matched-gem-counter--third {
        .matched-gem-counter__icon{
          background-position: 0 -73px;
          width: 73px;
          height: 73px;
        }
    }

    .matched-gem-counter--fourth {
        .matched-gem-counter__icon{
          background-position: -76px -74px;
          width: 73px;
          height: 73px;
        }
    }

    .matched-gem-counter--fifth {
        .matched-gem-counter__icon{
          background-position: 0 -150px;
          width: 73px;
          height: 73px;
        }
    }

</style>
