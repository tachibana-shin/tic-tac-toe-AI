import { Board, SIZE_BOARD } from "./board";

export type IndexFree = {
  x: number;
  y: number;
};

export function getFreeBoard(board: Board): IndexFree[] {
  const frees: IndexFree[] = [];

  for (let y = 0; y < SIZE_BOARD; y++) {
    for (let x = 0; x < SIZE_BOARD; x++) {
      if (!board[y][x]) {
        frees.push({
          x,
          y,
        });
      }
    }
  }

  return frees;
}
