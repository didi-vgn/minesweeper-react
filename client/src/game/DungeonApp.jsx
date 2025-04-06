import { useEffect, useRef, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import AdvCell from "./components/AdvCell";
import Scanner from "./components/Scanner";
import Overlay from "./components/Overlay";
import { IoMdArrowRoundBack } from "react-icons/io";
import Stopwatch from "./components/Stopwatch";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useInterval } from "./hooks/useInterval";
import { other } from "./utils/assets";
import { countBombsScanned } from "./logic/countBombsScanned";

export default function DungenApp({ back }) {
  const { gameState, movePlayer, scan, newDungeon, preferences, teleport } =
    useAdventureContext();
  const [player, setPlayer] = useState({
    x: Math.floor(gameState.board[0].length / 2),
    y: Math.floor(gameState.board.length / 2),
  });
  const [zoomedOut, setZoomedOut] = useState(true);
  const [viewport, setViewport] = useState(player);
  // const [resetTrigger, setResetTrigger] = useState(0);
  const [timerDisplay, setTimerDisplay] = useState("07:00");
  const timerRef = useRef(420);

  useInterval(
    () => {
      timerRef.current--;
      const sec = Math.floor(timerRef.current % 60)
        .toString()
        .padStart(2, "0");
      const min = Math.floor(timerRef.current / 60)
        .toString()
        .padStart(2, "0");
      const stopwatch = `${min}:${sec}`;
      setTimerDisplay(stopwatch);
    },
    gameState.status === "active" ? 1000 : null
  );

  function toggleZoom() {
    setZoomedOut((prev) => !prev);
  }

  function reset() {
    newDungeon();
    setPlayer({
      x: Math.floor(gameState.board[0].length / 2),
      y: Math.floor(gameState.board.length / 2),
    });
    setViewport({
      x: Math.floor(gameState.board[0].length / 2),
      y: Math.floor(gameState.board.length / 2),
    });
    timerRef.current = 420;
    setTimerDisplay("07:00");
  }

  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (e.key === "Tab") {
        toggleZoom();
      }
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
        if (e.key === "e" && gameState.board[player.y][player.x].portal) {
          teleport();
          setPlayer({
            x: Math.floor(gameState.board[0].length / 2),
            y: Math.floor(gameState.board.length / 2),
          });
          setViewport({
            x: Math.floor(gameState.board[0].length / 2),
            y: Math.floor(gameState.board.length / 2),
          });
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.status, player]);

  useEffect(() => {
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
  }, [player]);

  useEffect(() => {
    if (timerRef.current === 0 || gameState.status === "lost") {
      const score = gameState.level * 100 + gameState.gems * 25;
      console.log(score);
    }
  }, [gameState.status, timerRef]);

  return (
    <div className='text-xl'>
      <div
        className={`relative place-self-center custom-border flex justify-center items-center background-${
          zoomedOut ? "s" : "l"
        } background-${preferences.mapSkin.cover.split("_")[0].split("/")[2]}`}
      >
        <Overlay>
          <div className='flex justify-between items-center bg-[rgba(0,0,0,0.3)] pt-2 pb-2'>
            <div
              className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-r-xl hover:bg-gray-200 cursor-pointer'
              onClick={back}
            >
              <IoMdArrowRoundBack />
            </div>
            <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
              {gameState.gems}
              <img src={other.scanner} alt='' className='size-10' />
            </div>
            <div className='text-3xl font-outline flex gap-5'>
              {timerDisplay}
              {/* <Stopwatch
                status={gameState.status}
                resetTrigger={resetTrigger}
                // onWin={uploadGame}
              /> */}
              <div>Depth: {gameState.level}</div>
            </div>
            <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
              {gameState.scanners}
              <img src={other.scanner} alt='' className='size-10' />
            </div>
            <div
              className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-l-xl hover:bg-gray-200 cursor-pointer'
              onClick={reset}
            >
              <FaArrowRotateRight />
            </div>
          </div>
        </Overlay>
        <div className={`game-container-zoomed-${zoomedOut ? "out" : "in"}`}>
          <div
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
    </div>
  );
}
