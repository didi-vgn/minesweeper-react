import { useEffect } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import AdvCell from "./AdvCell";
import GameOverScreen from "./GameOverScreen";
import GameWinScreen from "./GameWinScreen";
import Scanner from "./Scanner";

export default function AdventureBoard({
  viewportStart,
  setViewportStart,
  player,
  setPlayer,
}) {
  const { gameState, movePlayer, scan } = useAdventureContext();
  const viewportWidth = 16;

  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (gameState.status === "active") {
        setPlayer((prev) => {
          let { x, y } = prev;

          if (e.key === "ArrowUp" && y > 0) y--;
          if (e.key === "ArrowLeft" && x > viewportStart) x--;
          if (e.key === "ArrowDown" && y < gameState.board.length - 1) y++;
          if (e.key === "ArrowRight" && x < gameState.board[0].length - 1) x++;
          return { x, y };
        });

        if (e.key === " " && gameState.scanners > 0) {
          scan(player.y, player.x);
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewportStart, gameState.status, player]);

  useEffect(() => {
    movePlayer(player.y, player.x);
    if (player.x > viewportStart + 8) {
      setViewportStart((prev) =>
        Math.min(prev + 1, gameState.board[0].length - viewportWidth)
      );
    }
  }, [player, viewportStart]);

  return (
    <div className='custom-border-rev'>
      <div className='game-container relative bg-gray-300'>
        <Scanner x={player.x - viewportStart} y={player.y} />
        <div
          className={`board flex flex-col`}
          style={{
            transform: `translateX(-${viewportStart * 4}rem)`,
            transition: "transform 0.3s ease-in-out",
            willChange: "transform",
          }}
        >
          {gameState.board?.map((row, i) => (
            <div key={i} className='flex'>
              {row.map((cell, j) => (
                <AdvCell
                  key={`${i}-${j}`}
                  cell={cell}
                  player={player.x === j && player.y === i ? true : false}
                />
              ))}
            </div>
          ))}
        </div>
        {(gameState.status === "lost" && <GameOverScreen />) ||
          (gameState.status === "won" && <GameWinScreen />)}
      </div>
    </div>
  );
}
