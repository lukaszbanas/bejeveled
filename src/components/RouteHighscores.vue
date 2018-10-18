<template>
    <div>
        <router-link to="/" class="sprite mdl-button mdl-js-button go-back-button" tag="button">go back</router-link>
        <div class="sprite scoreList">
            <ul>
                <li v-bind:key="index" v-for="(score,index) in getScoreList">
                    {{score.score}}<span>{{score.name}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import store from '../store'

    export default {
        name: 'RouteHighscores',
        mounted: function () {
            this.$connect()
            this.$options.sockets.onmessage = (message) => {
                if (typeof message !== 'undefined') {
                    if (message.data.size !== 0) {
                        let test = JSON.parse(message.data)

                        store.dispatch('game/setHighscores', test)
                    }
                }
            }
        },
        computed: {
            getScoreList: () => {
                return store.state.game.highscores
            }
        },
        methods: {
            //test
            send: () => {
                store.dispatch('ws/postScore', {name: 'test', score: 500})
            }
        }
    }
</script>

<style scoped lang="scss">
    .scoreList {
        margin: auto;
        width: 200px;
        height: 330px;
        overflow: hidden scroll;
        background-position: -200px -112px;

        ul {
            margin: 10px 20px;
            padding: 0;
        }

        li {
            margin: 0;
            padding: 0;
            list-style: none;
            text-align: left;
        }

        span {
            float: right;
            font-weight: bold;
        }
    }
</style>