import { useCallback, useState } from "react";
import { useAdventureContext } from "./context/AdventureContext";
import { RiResetLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Stopwatch from "./components/Stopwatch";
import { adventureLevels } from "./utils/levelsData";
import AdventureBoard from "./components/AdventureBoard";
import { useAuthContext } from "../context/AuthContext";
import { postAdvGameStats } from "../services/postAdvGameService";

export default function AdventureApp() {
  const { user } = useAuthContext();
  const {
    collectedGems,
    newGame,
    isAdvGameActive,
    currentLevel,
    advGameWin,
    setScore,
  } = useAdventureContext();
  const [player, setPlayer] = useState({ x: 0, y: 4 });
  const [viewportStart, setViewportStart] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const navigate = useNavigate();

  function reset() {
    setPlayer({ x: 0, y: 4 });
    newGame(adventureLevels[currentLevel - 1]);
    setViewportStart(0);
    setResetTrigger((prev) => prev + 1);
  }

  function goBack() {
    navigate("/adventure");
  }

  const uploadGame = useCallback(
    (time) => {
      if (advGameWin) {
        const score = Math.floor(
          ((collectedGems * 100) / (1 + Math.log(time))) *
            ((adventureLevels[currentLevel - 1].width +
              adventureLevels[currentLevel - 1].bombs) /
              20)
        );
        setScore(score);
        async function postGame() {
          const gameData = {
            userId: user.id,
            levelId: currentLevel,
            collectedGems: collectedGems,
            points: score,
          };

          try {
            const response = await postAdvGameStats(gameData);
            if (response === 201) {
              console.log("Game saved!");
            } else {
              console.log(response);
            }
          } catch (err) {
            console.error(err);
          }
        }
        postGame();
      }
    },
    [advGameWin]
  );

  return (
    <div className='flex flex-col items-center gap-3'>
      <div>
        <AdventureBoard
          viewportStart={viewportStart}
          setViewportStart={setViewportStart}
          player={player}
          setPlayer={setPlayer}
        ></AdventureBoard>
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
          <Stopwatch
            active={isAdvGameActive}
            resetTrigger={resetTrigger}
            callback={uploadGame}
          />
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
