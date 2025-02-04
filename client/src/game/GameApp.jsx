import Cell from "./components/Cell";
import GameHeader from "./components/GameHeader";
import { useGameContext } from "./context/GameContext";

export default function GameApp() {
  const { board, handleLeftClick, handleRightClick } = useGameContext();
  const width = board[0].length;

  const gridStyle = {
    9: "grid grid-cols-9",
    16: "grid grid-cols-16",
    30: "grid grid-cols-30",
  }[width];

  return (
    <div className='flex flex-col justify-center items-center bg-gray-300 p-1 custom-border'>
      <GameHeader />
      <div className={`${gridStyle} m-5 custom-border-rev`}>
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
