<template>
    <div class="scoreboard-container sprite">
        <div class="scoreboard sprite mdl-cell mdl-cell--4-col">
            <span>{{ score }}</span>
        </div>
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

<style scoped lang="scss">
    .scoreboard-container {
        margin-left: calc(33.3333333333% - 325px - 16px);
        background-position: -200px -111px;
        width: 200px;
        height: 331px;
        padding: 54px 10px 10px;
        box-sizing: border-box;
    }

    .scoreboard {
        width: 148px;
        background-position: -200px -605px;
        height: 37px;
        padding: 0 10px 0 40px;
        line-height: 34px;
        color: #ddc124;
        font-size: 18px;
        text-align: left;
        filter: drop-shadow(2px 3px 2px #000);
    }
</style>