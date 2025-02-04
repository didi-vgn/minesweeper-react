import { useState } from "react";
import ScoreGameBoard from "./ScoreGameBoard";

export default function TableRow({
  nickname,
  gameMode,
  time,
  bbbv,
  score,
  board,
}) {
  const [expand, setExpand] = useState(false);

  function expandGame() {
    setExpand(!expand);
  }
  return (
    <>
      <div
        className="cursor-pointer grid grid-cols-7 className='flex items-center bg-gray-300 w-full h-10 text-center hover:bg-gray-400 transition"
        onClick={expandGame}
      >
        <div className='col-start-2'>{nickname}</div>
        <div>{gameMode}</div>
        <div>{time}</div>
        <div>{bbbv}</div>
        <div>{score}</div>
      </div>
      {expand && <ScoreGameBoard board={board} />}
    </>
  );
}
