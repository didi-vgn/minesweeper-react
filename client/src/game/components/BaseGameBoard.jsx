import { useGameContext } from "../context/GameContext";
import Cell from "./Cell";

export default function BaseGameBoard() {
  const { gameState, handleLeftClick, handleRightClick } = useGameContext();
  return (
    <div className={`flex flex-col m-5 custom-border-rev select-none`}>
      {gameState.board.map((row, i) => (
        <div className='flex' key={i}>
          {row.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              cell={cell}
              onClick={() => handleLeftClick(i, j)}
              onRightClick={(e) => handleRightClick(e, i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
