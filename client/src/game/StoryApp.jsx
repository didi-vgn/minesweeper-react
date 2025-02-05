import { useEffect, useState } from "react";
import Cell from "./components/Cell";
import Cover from "./components/cells/Cover";
import { useStoryContext } from "./context/StoryContext";

export default function StoryApp() {
  const { board, movePlayer } = useStoryContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const viewportWidth = 15;
  // const width = board[0].length;

  // const gridStyle = {
  //   9: "grid grid-cols-9",
  //   16: "grid grid-cols-16",
  //   30: "grid grid-cols-30",
  //   100: "grid grid-cols-100",
  // }[width];

  useEffect(() => {
    function handleKeyPress(e) {
      setPlayer((prev) => {
        let { x, y } = prev;

        if (e.key === "ArrowUp" && y > 0) y--;
        if (e.key === "ArrowLeft" && x > 0) x--;
        if (e.key === "ArrowDown" && y < board.length - 1) y++;
        if (e.key === "ArrowRight" && x < board[0].length - 1) x++;
        return { x, y };
      });
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    movePlayer(player.y, player.x);
    if (player.x > viewportStart + 10) {
      setViewportStart((prev) => Math.min(prev + 1, 80));
    }
  }, [player]);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center bg-gray-300 p-1 custom-border m-15'>
        {player.x}
        <div className={`grid grid-cols-15 m-5 custom-border-rev`}>
          {board?.map((row, i) =>
            row
              .map((cell, j) => ({ cell, j }))
              .filter(
                ({ j }) =>
                  j >= viewportStart && j < viewportStart + viewportWidth
              )
              .map(({ cell, j }) =>
                cell.clicked ? (
                  <div
                    key={`${i}-${j}`}
                    className={`border border-gray-400 flex items-center justify-center size-8  ${
                      player.x === j && player.y === i
                        ? "bg-pink-300"
                        : "bg-gray-300"
                    }`}
                  >
                    {cell.value === 0
                      ? ""
                      : cell.value === -1
                      ? "💣"
                      : cell.value}
                  </div>
                ) : (
                  <div
                    key={`${i}-${j}`}
                    className='custom-border flex items-center justify-center size-8 bg-gray-300'
                  ></div>
                )
              )
          )}
        </div>
      </div>
    </div>
  );
}
