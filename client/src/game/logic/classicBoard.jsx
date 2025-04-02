import { addBombs } from "./addBombs";
import { addNumbers } from "./addNumbers";

export const generateClassicBoard = (width, height, bombs, conditions = []) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: false,
      flagged: false,
    }))
  );

  addBombs(board, bombs, conditions);
  addNumbers(board);
  return board;
};
