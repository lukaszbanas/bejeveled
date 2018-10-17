<template>
    <div class="notifier" v-bind:class="conditionalClass">
        <div v-if="status === 'idle'"></div>
        <div v-if="status === 'working'">WORKING</div>
        <div v-if="status === 'error'"><b>(!!!)</b> {{ statusMsg }}</div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        name: 'Notifier',
        computed: {
            status: () => {
                return store.state.progress.apiStatus
            },
            statusMsg: () => {
                return store.state.progress.apiStatusMessage
            },
            conditionalClass () {
                return {
                    'notifier--visible': store.state.progress.apiStatus === 'working' || store.state.progress.apiStatus === 'error',
                    'notifier--error': store.state.progress.apiStatus === 'error'
                }
            }
        }
    }
</script>

<style scoped>
    .notifier {
        display: inline-block;
        opacity: 0;
        min-width: 80px;
        height: 20px;
        padding: 10px 5px;
        line-height: 18px;
        font-size: 20px;
        background-color: #f4aa28;
        position: absolute;
        top: 0;
        right: 0;
        transition: .3s all;
        z-index: -1;
    }

    .notifier--visible {
        opacity: 1;
    }

    .notifier--error {
        background-color: red;
    }
</style>