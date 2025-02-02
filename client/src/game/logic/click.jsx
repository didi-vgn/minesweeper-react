import { adjacentCells } from "../utils/variables";

export const leftClick = (board, row, col) => {
  const height = board.length;
  const width = board[0].length;

  if (!clickedOrFlagged(row, col)) {
    const newBoard = board.map((row) => row.slice());

    function click(row, col) {
      newBoard[row][col].clicked = true;

      if (newBoard[row][col].value === 0) {
        adjacentCells.forEach(([i, j]) => {
          const newRow = i + row;
          const newCol = j + col;
          if (
            withinBounds(newRow, newCol) &&
            !clickedOrFlagged(newRow, newCol)
          ) {
            click(newRow, newCol);
          }
        });
      } else if (newBoard[row][col].value === -1) {
        newBoard.map((row) => {
          row.map((cell) => {
            if (cell.value === -1 && !cell.flagged) {
              cell.clicked = true;
            }
          });
        });
      }
    }

    click(row, col);
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
    const newBoard = board.map((row) => row.slice());
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    return newBoard;
  }
  return board;
};
