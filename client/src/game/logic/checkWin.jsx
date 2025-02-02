export const checkWin = (board) => {
  return !board.some((row) => {
    return row.some((cell) => {
      return cell.value >= 0 && !cell.clicked;
    });
  });
};
