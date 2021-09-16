export const SIZE_BOARD = 3;
export const CONSECUTIVE_VALUE_WIN = 3;
export type VALUE_TYPE_IN_BOARD = "x" | "o" | void;
export type Board = readonly VALUE_TYPE_IN_BOARD[][];

export function createBoard(): Board {
  return new Array(SIZE_BOARD).fill(0).map(() => new Array(SIZE_BOARD));
}
export function cloneBoard(board: Board): Board {
  return JSON.parse(JSON.stringify(board));
}
