import { useEffect, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import Stopwatch from "./components/Stopwatch";
import { adventureLevels } from "./utils/levelsData";
import AdventureBoard from "./components/AdventureBoard";
import { useAuthContext } from "../context/AuthContext";
import {
  postAdvGameProgress,
  postStatsAndUnlockAchievements,
} from "../services/adventureGamesServices";
import Overlay from "./components/Overlay";
import { countBombsScanned } from "./logic/countBombsScanned";
import NewAchievementToast from "./components/NewAchievementToast";
import { toast } from "react-toastify";

export default function AdventureApp({ onClick, progress }) {
  const { user, token } = useAuthContext();
  const { newGame, preferences, gameState, setGameState } =
    useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  function reset() {
    setPlayer({ x: 0, y: 4 });
    newGame(adventureLevels[gameState.level - 1]);
    setViewportStart(0);
    setResetTrigger((prev) => prev + 1);
  }

  function calculateScore(time) {
    return Math.floor(
      ((gameState.gems * 100) / (1 + Math.log(time))) *
        ((adventureLevels[gameState.level - 1].width +
          adventureLevels[gameState.level - 1].bombs) /
          20)
    );
  }

  async function postStats(stats) {
    try {
      const response = await postStatsAndUnlockAchievements(stats, token);
      if (response.newAchievements.length > 0) {
        response.newAchievements.map((a) => {
          toast(({ closeToast }) => (
            <NewAchievementToast data={a} closeToast={closeToast} />
          ));
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function postGameProgress(gameData) {
    try {
      await postAdvGameProgress(gameData, token);
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
      console.error("Failed to save to local storage.", err);
    }
  }

  useEffect(() => {
    if (!user || (gameState.status !== "won" && gameState.status !== '"lost'))
      return;
    const stats = {
      totalGems: gameState.gems,
      bombsScanned: countBombsScanned(gameState.board),
      characterUsed: preferences.playerSkin.split(".")[0].split("_")[2],
      levelsCompleted: gameState.status === "won" ? 1 : 0,
      deaths: gameState.status === "lost" ? 1 : 0,
    };
    postStats(stats);
  }, [gameState.status]);

  function uploadGame(time) {
    const currScore = calculateScore(time);
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

    user ? postGameProgress(gameData) : saveToLocalStorage(gameData);
  }

  return (
    <div className='flex flex-col items-center gap-3 mt-5'>
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
              {gameState.gems}
              <img src='/gem/gem_rainbow.png' alt='' className='size-10' />
            </div>
            <div className='text-3xl font-outline'>
              <Stopwatch
                status={gameState.status}
                resetTrigger={resetTrigger}
                onWin={uploadGame}
              />
            </div>
            <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
              {gameState.scanners}
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
