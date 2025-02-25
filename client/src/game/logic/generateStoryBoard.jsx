import { addBombs } from "./addBombs";
import { addNumbers } from "./addNumbers";

export const generateStoryBoard = (width, height, bombs, gems, scanners) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: false,
      gem: {
        color: "",
        collected: false,
      },
      scanned: false,
      scanner: false,
    }))
  );

  addBombs(board, bombs, [
    [3, 0],
    [4, 0],
    [5, 0],
    [3, 1],
    [4, 1],
    [5, 1],
  ]);
  addGems(board, gems);
  addScanners(board, scanners);
  addNumbers(board);
  return board;
};

const colors = ["pink", "blue", "green", "yellow", "white"];

const addScanners = (board, scanners) => {
  const height = board.length;
  const width = board[0].length;

  let availablePositions = [];
  for (let i = 1; i < height - 1; i++) {
    for (let j = 0; j < Math.floor((width * 2) / 3); j++) {
      if (i === 4 && j === 0) continue;
      if (board[i][j].value !== -1 && board[i][j].gem.color === "") {
        availablePositions.push({ i, j });
      }
    }
  }

  randomize(availablePositions);

  for (let g = 0; g < scanners; g++) {
    const { i, j } = availablePositions[g];
    board[i][j].scanner = true;
  }
};

const addGems = (board, gems) => {
  const height = board.length;
  const width = board[0].length;

  let availablePositions = [];
  for (let i = 1; i < height - 1; i++) {
    for (let j = 0; j < width; j++) {
      if (i === 4 && j === 0) continue;
      if (board[i][j].value !== -1) {
        availablePositions.push({ i, j });
      }
    }
  }
  randomize(availablePositions);
  for (let g = 0; g < gems - 1; g++) {
    const { i, j } = availablePositions[g];
    board[i][j].gem.color = colors[Math.floor(Math.random() * colors.length)];
  }

  availablePositions = [];
  for (let i = 1; i < height - 1; i++) {
    for (let j = board[0].length - 1; j >= board[0].length - 5; j--) {
      if (board[i][j].value !== -1 && board[i][j].gem.color === "") {
        availablePositions.push({ i, j });
      }
    }
  }
  randomize(availablePositions);
  const { i, j } = availablePositions[0];
  board[i][j].gem.color = "golden";
};

function randomize(arr) {
  for (let k = arr.length - 1; k > 0; k--) {
    const rand = Math.floor(Math.random() * (k + 1));
    [arr[k], arr[rand]] = [arr[rand], arr[k]];
  }
}
