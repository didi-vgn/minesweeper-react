import { adjacentCells } from "../utils/variables";
import { posToKey } from "./mapGenHelpers";

export const calculateDifficulty = (board) => {
  const height = board.length;
  const width = board[0].length;
  const visited = new Set();
  let numericCells = 0;
  let emptyClusters = 0;

  function withinBounds(row, col) {
    return row >= 0 && row < height && col >= 0 && col < width;
  }

  function floodFill(i, j) {
    let stack = [[i, j]];
    visited.add(posToKey(i, j));

    while (stack.length > 0) {
      const [i, j] = stack.pop();
      adjacentCells.forEach(([row, col]) => {
        const newRow = i + row;
        const newCol = j + col;
        if (
          withinBounds(newRow, newCol) &&
          !visited.has(posToKey(newRow, newCol)) &&
          board[newRow][newCol].value === 0
        ) {
          visited.add(posToKey(newRow, newCol));
          stack.push([newRow, newCol]);
        }
      });
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j].value > 0) {
        let count = !adjacentCells.some(([row, col]) => {
          const newRow = i + row;
          const newCol = j + col;
          return (
            withinBounds(newRow, newCol) && board[newRow][newCol].value === 0
          );
        });
        if (count) {
          numericCells++;
        }
      } else if (board[i][j].value === 0 && !visited.has(posToKey(i, j))) {
        emptyClusters++;
        floodFill(i, j);
      }
    }
  }

  return numericCells + emptyClusters;
};
