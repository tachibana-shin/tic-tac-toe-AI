import {
  Board,
  CONSECUTIVE_VALUE_WIN,
  SIZE_BOARD,
  VALUE_TYPE_IN_BOARD,
} from "./board";

function getWinnerInRow(board: Board): VALUE_TYPE_IN_BOARD {
  for (let y = 0; y < SIZE_BOARD; y++) {
    let consecutiveValue = 1;

    for (let x = 0; x < SIZE_BOARD - 1; x++) {
      if (board[y][x] && board[y][x] === board[y][x + 1]) {
        consecutiveValue++;

        if (consecutiveValue === CONSECUTIVE_VALUE_WIN) {
          // win
          return board[y][x];
        }

        continue;
      }

      consecutiveValue = 1;
    }
  }
}
function getWinnerInColumn(board: Board): VALUE_TYPE_IN_BOARD {
  for (let x = 0; x < SIZE_BOARD; x++) {
    let consecutiveValue = 1;

    for (let y = 0; y < SIZE_BOARD - 1; y++) {
      if (board[y][x] && board[y][x] === board[y + 1][x]) {
        consecutiveValue++;

        if (consecutiveValue === CONSECUTIVE_VALUE_WIN) {
          // win
          return board[y][x];
        }

        continue;
      }

      consecutiveValue = 1;
    }
  }
}
function getWinnerInDiagonalLeftToRight(board: Board): VALUE_TYPE_IN_BOARD {
  const max = SIZE_BOARD - CONSECUTIVE_VALUE_WIN + 1;

  for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
      // check index {x, y} win?

      for (let i = 0; i < CONSECUTIVE_VALUE_WIN - 1; i++) {
        if (
          board[y + i][x + i] &&
          board[y + i][x + i] === board[y + i + 1][x + i + 1]
        ) {
          //   console.log( i )
          if (i === CONSECUTIVE_VALUE_WIN - 1 - 1) {
            // end;
            return board[y][x];
          }

          continue;
        }

        break;
      }
    }
  }
}
function getWinnerInDiagonalRightToLeft(board: Board): VALUE_TYPE_IN_BOARD {
  const min = CONSECUTIVE_VALUE_WIN - 1 - 1;
  const max = SIZE_BOARD - CONSECUTIVE_VALUE_WIN + 1;

  for (let y = 0; y < max; y++) {
    for (let x = SIZE_BOARD - 1; x > min; x--) {
      // check index {x, y} win?

      for (let i = 0; i < CONSECUTIVE_VALUE_WIN - 1; i++) {
        if (
          board[y + i][x - i] &&
          board[y + i][x - i] === board[y + i + 1][x - i - 1]
        ) {
          //   console.log( i )
          if (i === CONSECUTIVE_VALUE_WIN - 1 - 1) {
            // end;
            return board[y][x];
          }

          continue;
        }

        break;
      }
    }
  }
}

export function getWinner(board: Board): VALUE_TYPE_IN_BOARD {
  return (
    getWinnerInRow(board) ||
    getWinnerInColumn(board) ||
    getWinnerInDiagonalLeftToRight(board) ||
    getWinnerInDiagonalRightToLeft(board)
  );
}