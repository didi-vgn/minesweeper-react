import { useEffect } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import AdvCell from "./AdvCell";
import GameOverScreen from "./GameOverScreen";
import GameWinScreen from "./GameWinScreen";

export default function AdventureBoard({
  viewportStart,
  setViewportStart,
  player,
  setPlayer,
}) {
  const { board, movePlayer, gameOver, advGameWin, scan } =
    useAdventureContext();

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

  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (!gameOver && !advGameWin) {
        setPlayer((prev) => {
          let { x, y } = prev;

          if (e.key === "ArrowUp" && y > 0) y--;
          if (e.key === "ArrowLeft" && x > viewportStart) x--;
          if (e.key === "ArrowDown" && y < board.length - 1) y++;
          if (e.key === "ArrowRight" && x < board[0].length - 1) x++;
          return { x, y };
        });

        if (e.key === " ") {
          scan(player.y, player.x);
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewportStart, gameOver, advGameWin, player]);

  useEffect(() => {
    movePlayer(player.y, player.x);
    if (player.x > viewportStart + 8) {
      setViewportStart((prev) =>
        Math.min(prev + 1, board[0].length - viewportWidth)
      );
    }
  }, [player, viewportStart]);

  return (
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
              <AdvCell
                key={`${i}-${j}`}
                cell={cell}
                player={player.x === j && player.y === i ? true : false}
              />
            ))
          )}
        </div>
        {(gameOver && <GameOverScreen />) || (advGameWin && <GameWinScreen />)}
      </div>
    </div>
  );
}
