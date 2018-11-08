<template>
  <div class="field">
    <div
      v-if="gem"
      :class="conditionalClass"
      class="gem sprite"
      draggable="true"
      @click="handleClick"/>
  </div>
</template>

<script>
  import store from '../store'
  import Gem from '../classes/Gem'
  import Area from "../classes/Area";
  import NullArea from "../classes/NullArea";

  export default {
    name: "Field",
    props: {
      gem: {
        type: Gem | null,
        default: null
      },
      position: {
        type: Object,
        default() {
          return {
            x: 0,
            y: 0
          }
        }
      },
      area: {
        type: Area,
        default() {
          return {
          }
        }
      }
    },
    computed: {
      hasGem: () => {
        return (this.gem !== null)
      },
      conditionalClass() {
        return {
          'hidden': this.area instanceof NullArea,
          'gem--first': this.gem instanceof Gem && this.gem.getType() === 1,
          'gem--second': this.gem instanceof Gem && this.gem.getType() === 2,
          'gem--third': this.gem instanceof Gem && this.gem.getType() === 3,
          'gem--fourth': this.gem instanceof Gem && this.gem.getType() === 4,
          'gem--fifth': this.gem instanceof Gem && this.gem.getType() === 5,
          'animation--leaving': this.$store.getters['board/isPositionContainsGemToRemove'](this.position),
          'animation--go-down': this.$store.getters['board/hasGemBelow'](this.position),
          'animation--is-clicked': this.$store.getters['board/isClickedArea'](this.position)
        }
      }
    },
    methods: {
      async handleClick() {
        if (store.state.board.canMakeMove !== true) {
          return
        }

        if (this.$store.getters['board/hasClickedArea']) {
          let possibleX = [this.position.x - 1, this.position.x, this.position.x + 1],
            possibleY = [this.position.y - 1, this.position.y, this.position.y + 1]

          if ((possibleX.indexOf(this.$store.getters['board/getClickedArea'].x) >= 0 && this.$store.getters['board/getClickedArea'].y === this.position.y) ||
            (possibleY.indexOf(this.$store.getters['board/getClickedArea'].y) >= 0 && this.$store.getters['board/getClickedArea'].x === this.position.x)) {

            //clicked area is cleared ad makeMove action, store it for revert
            let lastClickedArea = this.$store.getters['board/getClickedArea']

            await store.dispatch('board/makeMove', {
              'first': this.$store.getters['board/getClickedArea'],
              'second': this.position
            }).then(
              async () => {
                //success
              },
              async () => {
                await store.dispatch('board/revertMove', {
                  'first': this.position,
                  'second': lastClickedArea
                })
              }
            )
          } else {
            store.dispatch('board/clickAtArea', null)
          }
        } else {
          store.dispatch('board/clickAtArea', this.position)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .field {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover, &:focus {
            border: 1px inset #d4cea7;
            cursor: pointer;
        }
    }

    .gem {
        display: inline-block;
        animation-name: slide-from-up;
        animation-duration: .3s;

        &.hidden {
          visibility: hidden;
        }

        &.gem--first {
            background-position: -536px 0;
            width: 57px;
            height: 67px;
        }

        &.gem--second {
            background-position: -644px 0;
            width: 50px;
            height: 68px;
        }

        &.gem--third {
            background-position: -535px -67px;
            width: 56px;
            height: 49px;
        }

        &.gem--fourth {
            background-position: -644px -69px;
            width: 50px;
            height: 75px;
        }

        &.gem--fifth {
            background-position: -693px -143px;
            width: 46px;
            height: 75px;
        }
    }

    .animation--leaving {
        animation-name: vanishOut;
        animation-duration: .3s;
    }

    .animation--go-down {
        animation-name: slide-to-down;
        animation-duration: .3s;
    }

    .animation--is-clicked {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite;
    }
</style>
