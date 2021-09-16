<template>
  Turn: {{ turn }}

  <div class="row" v-for="(row, y) in board" :key="y">
    <div class="col" v-for="(col, x) in row" :key="x" @click="select(x, y)">
      {{ col }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  createBoard,
  Board,
  VALUE_TYPE_IN_BOARD,
  cloneBoard,
} from "./logic/board";

import { ref } from "vue";
import type { Remote } from "./logic/minimax";
import Minimax from "./logic/minimax?worker";
import { wrap } from "workercom";

const board = ref<Board>(createBoard());
const turn = ref<VALUE_TYPE_IN_BOARD>("x");

async function select(x: number, y: number): Promise<void> {
  if (turn.value === "x") {
    // ok
    turn.value = "o";
    board.value[y][x] = "x";
  } else {
    const minimax = wrap<Remote>(new Minimax());
    const best = await minimax(cloneBoard(board.value), false, 0, -500, 500);

    console.log(best);
    turn.value = "x";

    if (best.offset) {
      board.value[best.offset.y][best.offset.x] = "o";
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;

  .col {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #000;
  }
}
</style>
