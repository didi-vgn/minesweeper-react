import { useEffect, useRef, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import AdvCell from "./components/AdvCell";
import Scanner from "./components/Scanner";
import { useInterval } from "./hooks/useInterval";
import Hourglass from "./components/Hourglass";
import { useDunGameControls } from "./hooks/useGameControls";
import DungeonHud from "./components/DungeonHud";
import { useDunEndGameSubmission } from "./hooks/useEndGameSubmission";
import DunGameOverScreen from "./components/DunGameOverScreen";

export default function DungenApp({ back }) {
  const { gameState, setGameState, preferences, actions } =
    useAdventureContext();
  const [player, setPlayer] = useState({
    x: Math.floor(gameState.board[0].length / 2),
    y: Math.floor(gameState.board.length / 2),
  });
  const [zoomedOut, setZoomedOut] = useState(true);
  const [viewport, setViewport] = useState(player);
  const [timerDisplay, setTimerDisplay] = useState("07:00");
  const timerRef = useRef(420);
  const [totalExtraTime, setTotalExtraTime] = useState(0);

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
      if (timerRef.current === 0) {
        setGameState((prev) => ({ ...prev, status: "over" }));
      }
    },
    gameState.status === "active" ? 1000 : null
  );

  function toggleZoom() {
    setZoomedOut((prev) => !prev);
  }

  function reset() {
    const x = Math.floor(gameState.board[0].length / 2);
    const y = Math.floor(gameState.board.length / 2);
    actions.newDungeon();
    setTotalExtraTime(0);
    setPlayer({ x, y });
    setViewport({ x, y });
    timerRef.current = 420;
    setTimerDisplay("07:00");
  }

  useDunGameControls({
    gameState,
    player,
    setPlayer,
    toggleZoom,
    actions,
    setViewport,
  });

  useEffect(() => {
    if (gameState.board[player.y][player.x].extraTime) {
      timerRef.current = timerRef.current + 30;
      setTotalExtraTime((prev) => prev + 30);
    }
    actions.movePlayer(player.y, player.x);
    if (Math.abs(player.y - viewport.y) > 3) {
      setViewport((prev) => ({
        ...prev,
        y: prev.y + (player.y > viewport.y ? 1 : -1),
      }));
    }
    if (Math.abs(player.x - viewport.x) > 10) {
      setViewport((prev) => ({
        ...prev,
        x: prev.x + (player.x > viewport.x ? 1 : -1),
      }));
    }
  }, [player]);

  useDunEndGameSubmission({
    gameState,
    timerRef,
    totalExtraTime,
    preferences,
    setGameState,
  });

  return (
    <div className='text-xl'>
      <div
        className={`overflow-hidden relative place-self-center custom-border background-${
          zoomedOut ? "s" : "l"
        } background-${preferences.mapSkin.cover.split("_")[0].split("/")[2]}`}
      >
        <DungeonHud
          back={back}
          gems={gameState.gems}
          timer={timerDisplay}
          depth={gameState.level}
          scanners={gameState.scanners}
          reset={reset}
        />
        <div className={`game-container-zoomed-${zoomedOut ? "out" : "in"}`}>
          <div
            style={
              !zoomedOut
                ? {
                    top: "50%",
                    left: "50%",
                    transform: `translateX(-${
                      Math.max(viewport.x - 14, 0) * 4
                    }rem) translateY(-${Math.max(viewport.y - 6, 0) * 4}rem)`,
                    willChange: "transform",
                    transition: "transform 0.3s ease-in-out",
                  }
                : {}
            }
          >
            <Scanner x={player.x} y={player.y} />
            <Hourglass x={player.x} y={player.y} />
            {gameState.board.map((row, i) => (
              <div key={i} className='flex'>
                {row.map((cell, j) => (
                  <AdvCell
                    key={`${i}-${j}`}
                    cell={cell}
                    player={player.x === j && player.y === i ? true : false}
                    preferences={preferences}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {(gameState.status === "lost" || gameState.status === "over") && (
          <DunGameOverScreen />
        )}
      </div>
    </div>
  );
}
