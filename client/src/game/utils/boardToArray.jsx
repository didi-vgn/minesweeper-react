export const boardToArray = (board) => {
  const arr = board.map((row) => {
    let newRow = [];
    row.map((cell) => {
      newRow.push(cell.value);
    });
    return newRow;
  });

  return arr;
};
