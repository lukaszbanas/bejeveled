<template>
    <div class="fields-container">
        <div class="fields-row" :key="'k' + row" v-for="row in $store.state.board.rows">
            <div class="fields-col sprite" :key="'c' + col" v-for="col in $store.state.board.cols">
                <Field :key="'k' + row + 'c' + col"
                       :gem="$store.state.board.board[row - 1][col - 1].getGem()"
                       :position="{x: col - 1, y: row - 1}"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Field from './Field'

    export default {
        name: "Board",
        components: {
            Field
        }
    }
</script>

<style scoped>
    .fields-container {
        display: inline-block;
    }

    .fields-row {
        height: 75px;
    }

    .fields-col {
        display: inline-block;
        width: 75px;
        height: 75px;
        background-position: -400px -36px;
        overflow: hidden;
    }

    .fields-row:nth-child(odd) .fields-col:nth-child(even), .fields-row:nth-child(even) .fields-col:nth-child(odd) {
        background-position: -401px -111px;
    }
</style>