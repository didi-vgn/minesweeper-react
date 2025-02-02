import { adjacentCells } from "../utils/variables";

export const calculateDifficulty = (board) => {
  const height = board.length;
  const width = board[0].length;

  let visited = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  function withinBounds(row, col) {
    return row >= 0 && row < height && col >= 0 && col < width;
  }

  let numericCells = 0;
  let emptyClusters = 0;

  function floodFill(i, j) {
    let stack = [[i, j]];
    visited[i][j] = 1;

    while (stack.length > 0) {
      const [i, j] = stack.pop();

      adjacentCells.forEach(([row, col]) => {
        const newRow = i + row;
        const newCol = j + col;

        if (
          withinBounds(newRow, newCol) &&
          visited[newRow][newCol] === 0 &&
          board[newRow][newCol].value === 0
        ) {
          visited[newRow][newCol] = 1;
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
      } else if (board[i][j].value === 0 && visited[i][j] === 0) {
        emptyClusters++;
        floodFill(i, j);
      }
    }
  }

  return numericCells + emptyClusters;
};
