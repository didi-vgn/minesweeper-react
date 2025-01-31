import Cell from "./components/Cell";
import Header from "./components/Header";
import { getBoardDifficulty } from "./logic/calculateDifficulty";
import { generateBoard } from "./logic/generateBoard";

export default function GameApp() {
  const height = 9;
  const width = 9;
  const bombs = 10;

  const board = generateBoard(width, height, bombs);

  return (
    <div className='flex flex-col gap-5 justify-center items-center bg-pink-300 p-5'>
      <Header />
      <div className={`grid grid-cols-${width}`}>
        {board.map((row, i) =>
          row.map((cell, j) => <Cell key={`${i}-${j}`} cell={board[i][j]} />)
        )}
      </div>
    </div>
  );
}
