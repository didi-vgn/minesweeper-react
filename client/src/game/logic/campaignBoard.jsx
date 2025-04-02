import { addBombs } from "./addBombs";
import { addNumbers } from "./addNumbers";
import { random, shuffle } from "./mapGenHelpers";

export const generateAdventureBoard = (
  width,
  height,
  bombs,
  gems,
  scanners
) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: false,
      gem: null,
      scanned: false,
      scanner: false,
    }))
  );

  const i = random(height - 2) + 1;
  const j = width - random(5) - 1;
  board[i][j].gem = "golden";

  addBombs(board, bombs, [
    [3, 0],
    [4, 0],
    [5, 0],
    [3, 1],
    [4, 1],
    [5, 1],
    [i, j],
  ]);
  addItems(board, scanners, gems);
  addNumbers(board);
  return board;
};

const colors = ["pink", "blue", "green", "yellow", "white"];

const addItems = (board, scanners, gems) => {
  const height = board.length;
  const width = board[0].length;

  const scannersAvailablePos = [];
  const remainingAvailablePos = [];

  for (let i = 1; i < height - 1; i++) {
    for (let j = 0; j < width; j++) {
      if (i === 4 && j === 0) continue;
      if (board[i][j].value === -1 || board[i][j].gem === "golden") continue;
      if (j < Math.floor((width * 2) / 3)) {
        scannersAvailablePos.push({ i, j });
      }
      if (j >= Math.floor((width * 2) / 3)) {
        remainingAvailablePos.push({ i, j });
      }
    }
  }

  shuffle(scannersAvailablePos);
  for (let s = 0; s < scanners; s++) {
    const { i, j } = scannersAvailablePos.pop();
    board[i][j].scanner = true;
  }

  let gemsAvailablePos = [
    ...shuffle(scannersAvailablePos),
    ...shuffle(remainingAvailablePos),
  ];
  shuffle(gemsAvailablePos);
  for (let g = 0; g < gems; g++) {
    const { i, j } = gemsAvailablePos.pop();
    board[i][j].gem = colors[random(colors.length)];
  }
};
