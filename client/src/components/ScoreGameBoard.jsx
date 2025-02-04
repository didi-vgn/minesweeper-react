import Bomb from "../game/components/cells/Bomb";
import Empty from "../game/components/cells/Empty";
import Number from "../game/components/cells/Number";

export default function ScoreGameBoard({ board }) {
  const width = board[0].length;

  const gridStyle = {
    9: "grid grid-cols-9",
    16: "grid grid-cols-16",
    30: "grid grid-cols-30",
  }[width];

  return (
    <div className='flex justify-center items-center'>
      <div className={`${gridStyle} m-5 custom-border-rev`}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div className='flex items-center justify-center' key={`${i}-${j}`}>
              {cell === -1 ? (
                <Bomb />
              ) : cell === 0 ? (
                <Empty />
              ) : (
                <Number value={cell} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
