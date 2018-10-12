<template>
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col mdl-cell--4-offset">
            <div class="main-menu sprite">
                <button class="sprite mdl-button mdl-js-button" @click="startNewGame">New game</button>
                <button class="sprite mdl-button mdl-js-button" disabled>Load game</button>
                <button class="sprite mdl-button mdl-js-button" disabled>Highscores</button>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        name: "Menu",
        methods: {
            startNewGame: () => {
                store.dispatch('game/startNew')
                store.dispatch('board/generate')
            }
        }
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