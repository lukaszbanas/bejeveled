<template>
  <div 
    v-if="isBoardPrepared" 
    class="fields-container mdl-cell mdl-cell--4-col">
    <div 
      v-for="row in $store.state.board.rows" 
      :key="'k' + row" 
      class="fields-row">
      <div 
        v-for="col in $store.state.board.cols" 
        :key="'c' + col" 
        class="fields-col sprite">
        <Field 
          :key="'k' + row + 'c' + col"
          :gem="$store.state.board.board[row - 1][col - 1].getGem()"
          :position="{x: col - 1, y: row - 1}"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Field from './Field'
  import store from '../store'

  export default {
    name: "Board",
    components: {
      Field
    },
    computed: {
      isBoardPrepared: () => {
        return store.state.board.boardPrepared
      }
    }
  }
</script>

<style scoped>
    .fields-container {
        display: grid;
        grid-template-columns: repeat(10, 75px);
        grid-template-rows: repeat(10, 75px);
        grid-auto-flow: column;
        width: 750px;
    }

    .fields-row {
        height: 75px;
        display: grid;
        grid-template-columns: repeat(10, 75px);
    }

    .fields-col {
        width: 75px;
        height: 75px;
        background-position: -400px -36px;
    }

    .fields-row:nth-child(odd) .fields-col:nth-child(even), .fields-row:nth-child(even) .fields-col:nth-child(odd) {
        background-position: -401px -111px;
    }
</style>