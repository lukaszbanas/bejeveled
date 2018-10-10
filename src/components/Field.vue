<template>
    <div class="field">
        <div class="gem sprite" v-if="this.gem !== null" v-bind:class="conditionalClass" draggable="true" @dragend="handleDrop"></div>
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
                }
            }
        },
        methods: {
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
                    //     .then(
                    //     () => {
                    //         store.dispatch('game/addScore', store.state.board.pointsGained)
                    //     }
                    // );
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
        width: 57px;
        height: 67px;

        &.gem--first {
            background-position: -536px 0;
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
</style>