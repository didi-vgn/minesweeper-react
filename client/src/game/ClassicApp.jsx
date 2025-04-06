import { useGameContext } from "./context/GameContext";
import { FaStar } from "react-icons/fa";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";
import BaseGameBoard from "./components/BaseGameBoard";
import { processStats } from "../utils/processGameStats";
import {
  postGameStats,
  postGameStatsGuest,
} from "../services/baseGameServices";
import { calculateDifficulty } from "./logic/calculateDifficulty";
import { boardToArray } from "./utils/boardToArray";
import { useAuthContext } from "../context/AuthContext";
import { FaArrowRotateRight } from "react-icons/fa6";

export default function ClassicApp({ back }) {
  const { token } = useAuthContext();
  const { gameState, resetGame, config, setConfig } = useGameContext();
  const [resetTrigger, setResetTrigger] = useState(0);

  function handleReset() {
    setResetTrigger((prev) => prev + 1);
    resetGame();
  }

  function handleChangeGameMode(e) {
    const value = e.target.value;
    const newConfig = {
      a: { width: 9, height: 9, bombs: 10 },
      b: { width: 16, height: 16, bombs: 40 },
      c: { width: 30, height: 16, bombs: 99 },
    }[value];

    setConfig(newConfig);
    setResetTrigger((prev) => prev + 1);
    resetGame(newConfig.width, newConfig.height, newConfig.bombs);
  }

  function uploadGame(time) {
    if (time === 0) return;
    const stats = {
      bombs: config.bombs,
      bbbv: calculateDifficulty(gameState.board),
      board: JSON.stringify(boardToArray(gameState.board)),
      time: time,
    };
    async function postGame() {
      try {
        const gameData = processStats(stats);
        let response;
        if (token) {
          response = await postGameStats(gameData, token);
        } else {
          response = await postGameStatsGuest(gameData);
        }
      } catch (err) {
        console.error(err);
      }
    }
    postGame();
  }

  return (
    <div className='text-xl'>
      <div className='grid grid-cols-2 mb-10'>
        <div
          className='custom-border bg-gray-300 place-self-start w-23 text-center cursor-pointer'
          onClick={back}
        >
          Back
        </div>
        {/* <button
          onClick={handleReset}
          className='custom-border bg-gray-300 place-self-end cursor-pointer flex justify-center p-1 w-23'
        >
          <FaArrowRotateRight />
        </button> */}
      </div>
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='grid grid-cols-4 gap-3'>
          <div className='text-2xl flex items-center justify-center gap-2 place-self-end'>
            {gameState.bombsLeft} <FaStar />
          </div>
          <div className='text-3xl mx-auto'>
            <Stopwatch
              status={gameState.status}
              resetTrigger={resetTrigger}
              onWin={uploadGame}
            />
          </div>
          <select
            name='gameMode'
            id='difficulty'
            defaultValue={"b"}
            onChange={handleChangeGameMode}
            className='text-2xl bg-gray-300 custom-border'
          >
            <option value='a'>9x9 10 mines</option>
            <option value='b'>16x16 40 mines</option>
            <option value='c'>16x30 99 mines</option>
          </select>
          <button
            onClick={handleReset}
            className='custom-border bg-gray-300 cursor-pointer flex justify-center p-1 place-self-start'
          >
            <FaArrowRotateRight />
          </button>
        </div>
        <div className='bg-gray-300 p-1 custom-border'>
          <BaseGameBoard />
        </div>
      </div>
    </div>
  );
}
