import { Board, cloneBoard } from "./board";
import { getFreeBoard, IndexFree } from "./free";
import { getWinner } from "./winner";

import { expose } from "workercom";

export type Remote = (
  board: Board,
  isMax: boolean,
  depth: number,
  alpha: number,
  beta: number
) => Promise<{ value: number; offset?: IndexFree | undefined }>;

expose(function minimax(
  board: Board,
  isMax: boolean,
  depth: number = 0,
  alpha: number,
  beta: number
): { value: number; offset?: IndexFree | undefined } {
  switch (getWinner(board)) {
    case "x":
      return {
        value: 500 - depth,
      };
    case "o":
      return {
        value: -500 + depth,
      };
  }

  const frees = getFreeBoard(board);

  if (frees.length === 0) {
    return {
      value: depth,
    };
  }

  if (depth > 50) {
    return {
      value: depth,
    };
  }

  if (isMax) {
    // is max;
    let best = -Infinity;
    let offset: IndexFree | void;

    for (const { x, y } of frees) {
      const newBoard = cloneBoard(board);

      newBoard[y][x] = "x";

      const { value } = minimax(newBoard, false, depth + 1, alpha, beta);

      if (best < value) {
        best = value;
        offset = { x, y };
      }

      alpha = Math.max(alpha, best);

      if (beta <= alpha) {
        break;
      }
    }

    return offset
      ? {
          value: best,
          offset,
        }
      : {
          value: best,
        };
  } else {
    let best = Infinity;
    let offset: IndexFree | void;

    for (const { x, y } of frees) {
      const newBoard = cloneBoard(board);

      newBoard[y][x] = "o";

      const { value } = minimax(newBoard, true, depth + 1, alpha, beta);

      if (best > value) {
        best = value;
        offset = { x, y };
      }

      beta = Math.max(alpha, best);

      if (beta <= alpha) {
        break;
      }
    }

    return offset
      ? {
          value: best,
          offset,
        }
      : {
          value: best,
        };
  }
});
