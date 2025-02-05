import { addBombs } from "./addBombs";
import { addNumbers } from "./addNumbers";

export const generateStoryBoard = (width, height, bombs) => {
  let board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      value: 0,
      clicked: false,
    }))
  );

  addBombs(board, bombs);
  addNumbers(board);
  return board;
};
