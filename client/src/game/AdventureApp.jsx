import { useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import SCell from "./components/cells/SCell";
import { RiResetLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import GameOverScreen from "./components/GameOverScreen";
import Stopwatch from "./components/Stopwatch";
import GameWinScreen from "./components/GameWinScreen";
import { mockLevels } from "./utils/mockGameData";

export default function AdventureApp() {
  const {
    board,
    movePlayer,
    collectedGems,
    newGame,
    gameOver,
    isGameActive,
    gameWin,
    currentLevel,
  } = useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const navigate = useNavigate();

  const viewportWidth = 16;

  const gridStyle = {
    30: "grid grid-cols-30",
    40: "grid grid-cols-40",
    50: "grid grid-cols-50",
    60: "grid grid-cols-60",
    70: "grid grid-cols-70",
    80: "grid grid-cols-80",
    90: "grid grid-cols-90",
    100: "grid grid-cols-100",
  }[board[0].length];

  function reset() {
    setPlayer({ x: 0, y: 4 });
    newGame(mockLevels[currentLevel - 1]);
    setViewportStart(0);
    setResetTrigger((prev) => prev + 1);
  }

  function goBack() {
    navigate("/adventure");
  }

  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (!gameOver && !gameWin) {
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
  }, [viewportStart, gameOver, gameWin]);

  useEffect(() => {
    movePlayer(player.y, player.x);
    if (player.x > viewportStart + 8) {
      setViewportStart((prev) =>
        Math.min(prev + 1, board[0].length - viewportWidth)
      );
    }
  }, [player, viewportStart]);

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='custom-border-rev'>
        <div className='game-container relative bg-gray-300'>
          <div
            className={`board ${gridStyle}`}
            style={{
              transform: `translateX(-${viewportStart * 4}rem)`,
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

          {(gameOver && <GameOverScreen />) || (gameWin && <GameWinScreen />)}
        </div>
      </div>
      <div className='flex gap-10'>
        <div
          className='flex justify-center items-center size-14 custom-border bg-gray-300 text-2xl'
          onClick={goBack}
        >
          <IoMdArrowRoundBack />
        </div>
        <div className='custom-border-rev bg-white flex gap-2 items-center justify-center text-2xl w-35 h-14'>
          {collectedGems}
          <img src='/gem/gem_rainbow.png' alt='' className='size-10' />
        </div>
        <div className='w-35 h-14'>
          <Stopwatch isGameActive={isGameActive} resetTrigger={resetTrigger} />
        </div>
        <div
          className='flex justify-center items-center size-14 custom-border bg-gray-300 text-2xl'
          onClick={reset}
        >
          <RiResetLeftLine />
        </div>
      </div>
    </div>
  );
}
