export const addBombs = (board, bombs, conditions) => {
  const height = board.length;
  const width = board[0].length;
  let bombsLeft = bombs;

  while (bombsLeft > 0) {
    const i = Math.floor(Math.random() * height);
    const j = Math.floor(Math.random() * width);

    if (
      board[i][j].value !== -1 &&
      !conditions.some((condition) => condition[0] === i && condition[1] === j)
    ) {
      board[i][j].value = -1;
      bombsLeft--;
    }
  }
};
