<template>
    <div class="target-score-counter sprite drop-shadow">
        <div class="target-score-counter__label">matches:</div>
        <span>{{ matched > target ? target : matched }}</span>/<span>{{ target }}</span>
    </div>
</template>

<script>
    export default {
        name: 'TargetScoreCounter',
        props: {
            matched: 0,
            target: 0
        }
    }
</script>

<style scoped lang="scss">
    .target-score-counter {
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

    .target-score-counter__label {
        position: absolute;
        top: -15px;
        left: -15px;
    }
</style>