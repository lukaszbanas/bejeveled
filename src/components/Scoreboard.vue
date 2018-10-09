<template>
    <div class="scoreboard">
        Score: <span>{{ score }}</span>
    </div>
</template>

<script>
    export default {
        name: 'Scoreboard',
        props: {
            score: 0
        },
    }
</script>

<style scoped>

</style>