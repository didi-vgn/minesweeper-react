export const addBombs = (board, bombs) => {
  const height = board.length;
  const width = board[0].length;
  let bombsLeft = bombs;

  while (bombsLeft > 0) {
    const i = Math.floor(Math.random() * height);
    const j = Math.floor(Math.random() * width);

    if (board[i][j].value !== -1) {
      board[i][j].value = -1;
      bombsLeft--;
    }
  }
};
