export const countBombsScanned = (board) => {
  return board.reduce((acc, curr) => {
    return (
      acc +
      curr.reduce(
        (acc, curr) => acc + (curr.scanned && curr.value === -1 ? 1 : 0),
        0
      )
    );
  }, 0);
};
