import { adjacentCells } from "../utils/variables";

export const generateBoard = (width, height, bombs) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: false,
      flagged: false,
    }))
  );

  addBombs(board, bombs);
  addNumbers(board);
  return board;
};

const addBombs = (board, bombs) => {
  const height = board.length;
  const width = board[0].length;
  let bombsLeft = bombs;

  while (bombsLeft > 0) {
    const i = Math.floor(Math.random() * height);
    const j = Math.floor(Math.random() * width);

    if (board[i][j].value !== -1) {
      board[i][j].value = -1;
      bombsLeft--;
    }
  }
};

const addNumbers = (board) => {
  const height = board.length;
  const width = board[0].length;

  function withinBounds(i, j) {
    return i >= 0 && i < height && j >= 0 && j < width;
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].value === -1) continue;
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
