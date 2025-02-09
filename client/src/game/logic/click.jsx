import { adjacentCells } from "../utils/variables";

export const leftClick = (board, row, col) => {
  const height = board.length;
  const width = board[0].length;

  if (!clickedOrFlagged(row, col)) {
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    const stack = [[row, col]];

    while (stack.length > 0) {
      const [r, c] = stack.pop();
      if (newBoard[r][c].clicked) continue;

      newBoard[r][c] = { ...newBoard[r][c], clicked: true };

      if (newBoard[r][c].value === 0) {
        adjacentCells.forEach(([i, j]) => {
          const newRow = r + i;
          const newCol = c + j;
          if (
            withinBounds(newRow, newCol) &&
            !clickedOrFlagged(newRow, newCol)
          ) {
            stack.push([newRow, newCol]);
          }
        });
      }
    }

    if (newBoard[row][col].value === -1) {
      newBoard.forEach((row, i) =>
        row.forEach((cell, j) => {
          if (cell.value === -1 && !cell.flagged) {
            newBoard[i][j] = { ...newBoard[i][j], clicked: true };
          }
        })
      );
    }
    return newBoard;
  }
  function withinBounds(i, j) {
    return i >= 0 && i < height && j >= 0 && j < width;
  }

  function clickedOrFlagged(i, j) {
    return board[i][j].clicked || board[i][j].flagged;
  }

  return board;
};

export const rightClick = (board, row, col) => {
  if (!board[row][col].clicked) {
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[row][col] = {
      ...newBoard[row][col],
      flagged: !newBoard[row][col].flagged,
    };
    return newBoard;
  }
  return board;
};
