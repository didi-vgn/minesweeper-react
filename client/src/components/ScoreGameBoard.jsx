import { FaStar } from "react-icons/fa";
import { colors } from "../game/utils/assets";

export default function ScoreGameBoard({ board }) {
  return (
    <div className='flex flex-col custom-border-rev m-5'>
      {board.map((row, i) => (
        <div className='flex' key={i}>
          {row.map((cell, j) => (
            <div
              className='flex items-center justify-center size-6 border bg-gray-300 border-gray-400 text-lg font-extrabold'
              key={`${i}-${j}`}
            >
              <div className={`${colors[cell]}`}>
                {cell === 0 ? "" : cell === -1 ? <FaStar /> : cell}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
