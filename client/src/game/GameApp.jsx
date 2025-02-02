import Cell from "./components/Cell";
import Header from "./components/Header";
import { useGameContext } from "./context/GameContext";

export default function GameApp() {
  const { board, handleLeftClick, handleRightClick, getBoardDifficulty } =
    useGameContext();

  const difficulty = getBoardDifficulty();
  const width = board[0].length;

  const gridStyle = {
    9: "grid grid-cols-9",
    16: "grid grid-cols-16",
    30: "grid grid-cols-30",
  }[width];

  return (
    <div className='flex flex-col gap-5 justify-center items-center bg-pink-300 p-5'>
      <Header />
      <div>{difficulty}</div>
      <div className={`${gridStyle}`}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              cell={board[i][j]}
              onClick={() => handleLeftClick(i, j)}
              onRightClick={(e) => handleRightClick(e, i, j)}
            />
          ))
        )}
      </div>
    </div>
  );
}
