import { getBoardDifficulty } from "./calculateDifficulty";

export const generateBoard = (width, height, bombs) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: true,
      flagged: false,
    }))
  );

  addBombs(board, bombs);
  addNumbers(board);
  const diff = getBoardDifficulty(board);

  console.log(diff);

  return board;
};

function addBombs(board, bombs) {
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
}

function addNumbers(board) {
  const height = board.length;
  const width = board[0].length;

  const adjacentCells = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, -1],
    [0, +1],
    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  function withinBounds(row, col) {
    return row >= 0 && row < height && col >= 0 && col < width;
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
}
