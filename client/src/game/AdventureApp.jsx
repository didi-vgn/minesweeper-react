import { useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import { adventureLevels } from "./utils/levelsData";
import { useAuthContext } from "../context/AuthContext";
import { useAdvEndGameSubmission } from "./hooks/useEndGameSubmission";
import AdventureHud from "./components/AdventureHud";
import Scanner from "./components/Scanner";
import { useAdvGameControls } from "./hooks/useGameControls";
import AdvCell from "./components/AdvCell";
import GameOverScreen from "./components/GameOverScreen";
import GameWinScreen from "./components/GameWinScreen";
import { useAdvScoreMethod } from "./hooks/usePostScoreMethods";

export default function AdventureApp({ back, progress }) {
  const { user, token } = useAuthContext();
  const { preferences, gameState, setGameState, actions } =
    useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const viewportWidth = 24;
  const [resetTrigger, setResetTrigger] = useState(0);
  const { postProgress } = useAdvScoreMethod();

  function reset() {
    setPlayer({ x: 0, y: 4 });
    actions.newGame(adventureLevels[gameState.level - 1]);
    setViewportStart(0);
    setResetTrigger((prev) => prev + 1);
  }

  function saveToLocalStorage(gameData) {
    try {
      let localProgress =
        JSON.parse(localStorage.getItem("localProgress")) || [];

      const existingIndex = localProgress.findIndex(
        (level) => level.levelId === gameData.levelId
      );

      if (existingIndex !== -1) {
        localProgress[existingIndex] = gameData;
      } else {
        localProgress.push(gameData);
      }
      localStorage.setItem("localProgress", JSON.stringify(localProgress));
    } catch (err) {
      console.error("Failed to save to local storage.", err);
    }
  }
  useAdvEndGameSubmission({ gameState, preferences });

  function uploadGame(time) {
    const currScore = Math.floor(
      (gameState.gems *
        150 *
        (1 + gameState.level * 0.05) *
        (1 + adventureLevels[gameState.level - 1].bombs / 100)) /
        (1 + Math.log(time + 1))
    );
    setGameState((prev) => ({ ...prev, score: currScore }));
    const existingGameIndex = progress.findIndex(
      (level) => level.levelId === gameState.level
    );
    if (
      existingGameIndex >= 0 &&
      (gameState.gems < progress[existingGameIndex].collectedGems ||
        (gameState.gems === progress[existingGameIndex].collectedGems &&
          gameState.score < progress[existingGameIndex].points))
    ) {
      return;
    }
    const gameData = {
      levelId: gameState.level,
      collectedGems: gameState.gems,
      points: currScore,
    };

    user ? postProgress(token, gameData) : saveToLocalStorage(gameData);
  }

  useAdvGameControls({
    player,
    setPlayer,
    viewportStart,
    gameState,
    actions,
  });

  useEffect(() => {
    actions.movePlayer(player.y, player.x);
    if (player.x > viewportStart + 12) {
      setViewportStart((prev) =>
        Math.min(prev + 1, gameState.board[0].length - viewportWidth)
      );
    }
  }, [player, viewportStart]);

  return (
    <div className='overflow-hidden relative place-self-center custom-border scale-120 mt-20'>
      <AdventureHud
        back={back}
        gems={gameState.gems}
        status={gameState.status}
        resetTrigger={resetTrigger}
        uploadGame={uploadGame}
        scanners={gameState.scanners}
        reset={reset}
      />
      <div className='game-container bg-gray-300'>
        <Scanner x={player.x - viewportStart} y={player.y} />
        <div
          className={`flex flex-col`}
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
                  preferences={preferences}
                />
              ))}
            </div>
          ))}
        </div>
        {gameState.status === "lost" && <GameOverScreen />}
        {gameState.status === "won" && <GameWinScreen />}
      </div>
    </div>
  );
}
