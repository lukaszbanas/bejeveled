<template>
    <div class="field">
        <div class="gem sprite" v-if="this.gem !== null" v-bind:class="conditionalClass" draggable="true" @click="handleClick"></div>
    </div>
</template>

<script>
    import store from '../store'
    import Gem from '../classes/Gem'
    export default {
        name: "Field",
        props: {
            gem: null,
            position: {
                x: 0,
                y: 0
            }
        },
        computed: {
            conditionalClass () {
                return {
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
            async handleClick () {
                if (store.state.board.canMakeMove !== true ) {
                    return
                }

                if (this.$store.getters['board/hasClickedArea']) {
                    let possibleX = [this.position.x - 1, this.position.x, this.position.x + 1],
                        possibleY = [this.position.y - 1, this.position.y, this.position.y + 1]

                    if (possibleX.indexOf(this.$store.getters['board/getClickedArea'].x) < 0 || possibleY.indexOf(this.$store.getters['board/getClickedArea'].y) < 0) {
                        store.dispatch('board/clickAtArea', null)
                        return
                    }

                    await store.dispatch('board/makeMove', {
                        'first': this.$store.getters['board/getClickedArea'],
                        'second': this.position
                    }).then(() => {
                        store.dispatch('game/addScore', store.state.board.pointsGained)
                    })
                } else {
                    store.dispatch('board/clickAtArea', this.position)
                }
            },
            async handleDrop (event) {
                if (store.state.board.canMakeMove !== true ) {
                    return
                }

                let target, direction = 'right';

                if (event.offsetX * event.offsetX > event.offsetY * event.offsetY) {
                    direction = (event.offsetX > 0) ? 'right' : 'left'
                } else {
                    direction = (event.offsetY < 0) ? 'top' : 'bottom'
                }

                target = {
                    x: direction === 'right' ? this.position.x + 1 : direction === 'left' ? this.position.x - 1 : this.position.x,
                    y: direction === 'top' ? this.position.y - 1 : direction === 'bottom' ? this.position.y + 1 : this.position.y,
                }

                if (typeof store.state.board.board[target.y] !== 'undefined' && typeof store.state.board.board[target.y][target.x] !== 'undefined') {
                    await store.dispatch('board/makeMove', {
                        'first': this.position,
                        'second': {
                            x: direction === 'right' ? this.position.x + 1 : direction === 'left' ? this.position.x - 1 : this.position.x,
                            y: direction === 'top' ? this.position.y - 1 : direction === 'bottom' ? this.position.y + 1 : this.position.y,
                        }
                    }).then(() => {
                        store.dispatch('game/addScore', store.state.board.pointsGained)
                    })
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
        animation-duration: .5s;
    }

    .animation--go-down {
        animation-name: slide-to-down;
        animation-duration: .2s;
    }

    .animation--is-clicked {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite;
    }

    @keyframes slide-from-up {
        from {margin-top: -100px;}
        to {margin-top: 0;}
    }

    @keyframes slide-to-down {
        from {margin-top: 0;}
        to {margin-top: 100px;}
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
            filter: blur(20px);
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