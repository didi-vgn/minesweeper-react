import { useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import AdvCell from "./components/AdvCell";
import Scanner from "./components/Scanner";

export default function DungenApp() {
  const { gameState, movePlayer, scan, newDungeon, teleport } =
    useAdventureContext();
  const [player, setPlayer] = useState({
    x: Math.floor(59 / 2),
    y: Math.floor(26 / 2),
  });
  const [zoomedOut, setZoomedOut] = useState(true);
  const [viewport, setViewport] = useState(player);

  useEffect(() => {
    newDungeon();
  }, []);

  function toggleZoom() {
    setZoomedOut((prev) => !prev);
  }

  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (gameState.status === "active") {
        setPlayer((prev) => {
          let { x, y } = prev;

          if (
            e.key === "ArrowUp" &&
            y > 0 &&
            gameState.board[y - 1][x].value > -2
          )
            y--;
          if (
            e.key === "ArrowLeft" &&
            x > 0 &&
            gameState.board[y][x - 1].value > -2
          )
            x--;
          if (
            e.key === "ArrowDown" &&
            y < gameState.board.length - 1 &&
            gameState.board[y + 1][x].value > -2
          )
            y++;
          if (
            e.key === "ArrowRight" &&
            x < gameState.board[0].length - 1 &&
            gameState.board[y][x + 1].value > -2
          )
            x++;
          return { x, y };
        });

        if (e.key === " " && gameState.scanners > 0) {
          scan(player.y, player.x);
        }

        if (e.key === "Tab") {
          toggleZoom();
        }

        if (e.key === "e" && gameState.board[player.y][player.x].portal) {
          teleport();
          setPlayer({ x: Math.floor(59 / 2), y: Math.floor(26 / 2) });
          setViewport({ x: Math.floor(59 / 2), y: Math.floor(26 / 2) });
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.status, player]);

  useEffect(() => {
    if (gameState.board.length === 0) return;
    movePlayer(player.y, player.x);
    if (Math.abs(player.y - viewport.y) > 3) {
      if (player.y > viewport.y) {
        setViewport((prev) => ({ ...prev, y: prev.y + 1 }));
      } else setViewport((prev) => ({ ...prev, y: prev.y - 1 }));
    }
    if (Math.abs(player.x - viewport.x) > 10) {
      if (player.x > viewport.x) {
        setViewport((prev) => ({ ...prev, x: prev.x + 1 }));
      } else setViewport((prev) => ({ ...prev, x: prev.x - 1 }));
    }
  }, [player, gameState.board, viewport]);

  if (!gameState.board) return <div>Loading...</div>;

  return (
    <div className='h-full flex justify-center items-center'>
      <div className={`game-container-zoomed-${zoomedOut ? "out" : "in"}`}>
        <div
          // className='transition duration-300 ease-in-out'
          style={
            !zoomedOut
              ? {
                  transform: `translateX(-${
                    (viewport.x - 14) * 4
                  }rem) translateY(-${(viewport.y - 6) * 4}rem)`,
                  willChange: "transform",
                  transition: "transform 0.3s ease-in-out",
                }
              : {}
          }
        >
          <Scanner x={player.x} y={player.y} />
          {gameState.board.map((row, i) => (
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
      </div>
    </div>
  );
}
