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
        className={`cursor-pointer grid grid-cols-5 items-center ${
          expand ? "bg-gray-400" : "bg-gray-300"
        } w-9/10 m-auto h-10 text-center hover:bg-gray-400 border border-stone-100`}
        onClick={expandGame}
      >
        <div>{nickname}</div>
        <div>{gameMode}</div>
        <div>{time}</div>
        <div>{bbbv}</div>
        <div>{score}</div>
      </div>
      {expand && (
        <div className='bg-gray-100 w-9/10 m-auto flex justify-around items-center gap-10'>
          <div className='flex flex-col gap-5'>
            <div>Nickname: {nickname}</div>
            <div>Game Mode: {gameMode}</div>
            <div>Time: {time}</div>
            <div>3BV: {bbbv}</div>
            <div>Score: {score}</div>
          </div>
          <ScoreGameBoard board={board} />
        </div>
      )}
    </>
  );
}
