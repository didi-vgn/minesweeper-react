import { useCallback, useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import Stopwatch from "./components/Stopwatch";
import { adventureLevels } from "./utils/levelsData";
import AdventureBoard from "./components/AdventureBoard";
import { useAuthContext } from "../context/AuthContext";
import {
  postAdvGameStats,
  postStatsAndUnlockAchievements,
} from "../services/adventureGamesServices";
import Overlay from "./components/Overlay";
import { countBombsScanned } from "./logic/countBombsScanned";
import NewAchievementNotification from "./components/NewAchievementNotification";
import Notifications from "./components/Notifications";

export default function AdventureApp({ onClick, progress }) {
  const { user } = useAuthContext();
  const {
    collectedGems,
    newGame,
    isAdvGameActive,
    currentLevel,
    advGameWin,
    setScore,
    availableScanners,
    playerSprite,
    board,
    gameOver,
  } = useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [newAchievements, setNewAchievements] = useState(null);

  function reset() {
    setPlayer({ x: 0, y: 4 });
    newGame(adventureLevels[currentLevel - 1]);
    setViewportStart(0);
    setResetTrigger((prev) => prev + 1);
  }

  function calculateScore(time) {
    return Math.floor(
      ((collectedGems * 100) / (1 + Math.log(time))) *
        ((adventureLevels[currentLevel - 1].width +
          adventureLevels[currentLevel - 1].bombs) /
          20)
    );
  }

  useEffect(() => {
    if (!user) return;
    const stats = {
      userId: user.id,
      totalGems: collectedGems,
      bombsScanned: countBombsScanned(board),
      characterUsed: playerSprite.split(".")[0].split("_")[2],
      levelsCompleted: advGameWin ? 1 : 0,
      deaths: gameOver ? 1 : 0,
    };
    async function postStats(stats) {
      try {
        const response = await postStatsAndUnlockAchievements(stats);
        if (response.length > 0) {
          setNewAchievements(response);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (user && (advGameWin || gameOver)) {
      postStats(stats);
    }
  }, [gameOver, advGameWin]);

  async function postGame(gameData) {
    try {
      await postAdvGameStats(gameData);
    } catch (err) {
      console.error(err);
    }
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
      console.error("Failed to save to local storage", err);
    }
  }

  const uploadGame = useCallback(
    (time) => {
      if (!advGameWin) return;
      const score = calculateScore(time);
      setScore(score);

      const existingGameIndex = progress.findIndex(
        (level) => level.levelId === currentLevel
      );

      if (
        existingGameIndex >= 0 &&
        (collectedGems < progress[existingGameIndex].collectedGems ||
          (collectedGems === progress[existingGameIndex].collectedGems &&
            score < progress[existingGameIndex].points))
      ) {
        return;
      }
      const gameData = {
        userId: user?.id,
        levelId: currentLevel,
        collectedGems: collectedGems,
        points: score,
      };

      user ? postGame(gameData) : saveToLocalStorage(gameData);
    },
    [advGameWin]
  );

  return (
    <div className='flex flex-col items-center gap-3 mt-5'>
      <Notifications>
        {newAchievements?.map((a) => (
          <NewAchievementNotification key={a.id} data={a} />
        ))}
      </Notifications>
      <div className='relative'>
        <Overlay>
          <div className='flex justify-between items-center bg-[rgba(0,0,0,0.3)] pt-2 pb-2'>
            <div
              className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-r-xl hover:bg-gray-200 cursor-pointer'
              onClick={onClick}
            >
              <IoMdArrowRoundBack />
            </div>
            <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
              {collectedGems}
              <img src='/gem/gem_rainbow.png' alt='' className='size-10' />
            </div>
            <div className='text-3xl font-outline'>
              <Stopwatch
                active={isAdvGameActive}
                resetTrigger={resetTrigger}
                callback={uploadGame}
              />
            </div>
            <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
              {availableScanners}
              <img src='/gem/scanner.png' alt='' className='size-10' />
            </div>
            <div
              className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-l-xl hover:bg-gray-200 cursor-pointer'
              onClick={reset}
            >
              <FaArrowRotateRight />
            </div>
          </div>
        </Overlay>
        <AdventureBoard
          viewportStart={viewportStart}
          setViewportStart={setViewportStart}
          player={player}
          setPlayer={setPlayer}
        ></AdventureBoard>
      </div>
    </div>
  );
}
