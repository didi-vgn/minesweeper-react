import { useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import SCell from "./components/SCell";
import { FaStar } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

export default function AdventureApp() {
  const { board, movePlayer, gems, surviveLevel, bombs, gameOver } =
    useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);

  const viewportWidth = 16;

  const gridStyle = {
    50: "grid grid-cols-50",
    60: "grid grid-cols-60",
    70: "grid grid-cols-70",
    80: "grid grid-cols-80",
    90: "grid grid-cols-90",
    100: "grid grid-cols-100",
  }[board[0].length];

  function reset() {
    setPlayer({ x: 0, y: 4 });
    surviveLevel(board[0].length, 9, bombs);
    setViewportStart(0);
  }

  useEffect(() => {
    function handleKeyPress(e) {
      if (!gameOver) {
        console.log("key press", gameOver);

        setPlayer((prev) => {
          let { x, y } = prev;

          if (e.key === "ArrowUp" && y > 0) y--;
          if (e.key === "ArrowLeft" && x > viewportStart) x--;
          if (e.key === "ArrowDown" && y < board.length - 1) y++;
          if (e.key === "ArrowRight" && x < board[0].length - 1) x++;
          return { x, y };
        });
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewportStart, gameOver]);

  useEffect(() => {
    movePlayer(player.y, player.x);
    if (player.x > viewportStart + 8) {
      setViewportStart((prev) =>
        Math.min(prev + 1, board[0].length - viewportWidth)
      );
    }
  }, [player, viewportStart]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex gap-5 items-center'>
        <div
          className='flex justify-center items-center size-10 custom-border bg-gray-300 text-2xl'
          onClick={reset}
        >
          <RiResetLeftLine />
        </div>
        <div className='custom-border-rev  flex gap-2 items-center p-2 m-3 text-2xl'>
          {gems}/16 <FaStar />
        </div>
      </div>
      <div className='custom-border'>
        <div className='game-container bg-gray-300'>
          <div
            className={`board ${gridStyle}`}
            style={{
              transform: `translateX(-${viewportStart * 64}px)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {board?.map((row, i) =>
              row.map((cell, j) => (
                <SCell
                  key={`${i}-${j}`}
                  cell={cell}
                  player={player.x === j && player.y === i ? true : false}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
