<template>
    <div class="left-panel">
        <Scoreboard
            :score="$store.state.progress.score"
            :matched_first="$store.state.board.matchedGems[1]"
            :matched_second="$store.state.board.matchedGems[2]"
            :matched_third="$store.state.board.matchedGems[3]"
            :matched_fourth="$store.state.board.matchedGems[4]"
            :matched_fifth="$store.state.board.matchedGems[5]"
            :game_type="$store.state.board.gameTarget"
        />
        <div class="moves-container sprite">
            <span>Moves left: </span><span class="moves" v-bind:class="calcMovesLeft <= 3 ? 'moves-red' : ''">{{ calcMovesLeft }}</span>
        </div>
    </div>
</template>

<script>
    import Scoreboard from './Scoreboard'
    import store from '../store'

    export default {
        name: 'LeftPanel',
        components: {
            Scoreboard
        },
        computed: {
            calcMovesLeft: () => {
                return store.getters['board/getMovesLeft']
            }
        }
    }
</script>

<style scoped lang="scss">
    .left-panel {
        margin-left: auto;
        width: 200px;
    }

    .moves-container {
        background-position: 0px -201px;
        height: 50px;
        line-height: 47px;
    }

    .moves {
        font-size: larger;
    }

    .moves-red {
        color: #b30000;
        font-size: large;
        animation: vanishOut .5s alternate-reverse infinite;
    }
</style>