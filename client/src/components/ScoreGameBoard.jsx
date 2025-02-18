import { FaStar } from "react-icons/fa";

export default function ScoreGameBoard({ board }) {
  const colors = [
    "text-stone-950",
    "text-lime-600",
    "text-amber-400",
    "text-orange-500",
    "text-red-600",
    "text-pink-600",
    "text-fuchsia-600",
    "text-violet-500",
    "text-indigo-600",
  ];
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
            <div
              className='flex items-center justify-center size-6 border bg-gray-300 border-gray-400 text-lg font-extrabold'
              key={`${i}-${j}`}
            >
              <div className={`${colors[cell]}`}>
                {cell === 0 ? "" : cell === -1 ? <FaStar /> : cell}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
