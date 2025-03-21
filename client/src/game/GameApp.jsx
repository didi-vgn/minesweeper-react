import { useGameContext } from "./context/GameContext";
import { RiResetLeftLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";
import BaseGameBoard from "./components/BaseGameBoard";
import { processStats } from "../utils/processGameStats";
import { postGameStats, postGameStatsGuest } from "../services/postGameService";
import { calculateDifficulty } from "./logic/calculateDifficulty";
import { boardToArray } from "./utils/boardToArray";
import { useAuthContext } from "../context/AuthContext";

export default function GameApp() {
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
        if (response !== 201) {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    }
    postGame();
  }

  return (
    <div>
      <div className='custom-border bg-gray-300 p-3 grid grid-cols-4 gap-2 text-center'>
        <div className='custom-border-rev bg-white flex items-center justify-center gap-2'>
          {gameState.bombsLeft} <FaStar />
        </div>
        <div className='custom-border-rev bg-white flex justify-center items-center'>
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
        >
          <option value='a'>9x9 10 mines</option>
          <option value='b'>16x16 40 mines</option>
          <option value='c'>16x30 99 mines</option>
        </select>
        <button
          onClick={handleReset}
          className='flex justify-center items-center'
        >
          <RiResetLeftLine />
        </button>
      </div>
      <div className='flex flex-col justify-center items-center bg-gray-300 p-1 custom-border'>
        <BaseGameBoard />
      </div>
    </div>
  );
}
