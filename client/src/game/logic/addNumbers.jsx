import { adjacentCells } from "../utils/variables";

export const addNumbers = (board) => {
  const height = board.length;
  const width = board[0].length;

  function withinBounds(i, j) {
    return i >= 0 && i < height && j >= 0 && j < width;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].value === -1) continue;
      if (board[i][j].value === -2) continue;

      let number = 0;
      adjacentCells.forEach(([row, col]) => {
        const newRow = i + row;
        const newCol = j + col;

        if (
          withinBounds(newRow, newCol) &&
          board[newRow][newCol].value === -1
        ) {
          number++;
        }
      });
      board[i][j].value = number;
    }
  }
};
