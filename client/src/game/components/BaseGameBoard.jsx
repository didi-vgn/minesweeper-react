import { useGameContext } from "../context/GameContext";
import Cell from "./Cell";

export default function BaseGameBoard() {
  const { board, handleLeftClick, handleRightClick } = useGameContext();

  const width = board[0].length;

  const gridStyle = {
    9: "grid grid-cols-9",
    16: "grid grid-cols-16",
    30: "grid grid-cols-30",
  }[width];

  return (
    <div className={`${gridStyle} m-5 custom-border-rev select-none`}>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            cell={cell}
            onClick={() => handleLeftClick(i, j)}
            onRightClick={(e) => handleRightClick(e, i, j)}
          />
        ))
      )}
    </div>
  );
}
