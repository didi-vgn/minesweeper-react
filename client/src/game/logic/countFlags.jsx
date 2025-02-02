export const countFlags = (board) => {
  return board.reduce((acc, curr) => {
    return acc + curr.reduce((acc, curr) => acc + (curr.flagged ? 1 : 0), 0);
  }, 0);
};
