import { useGameContext } from "./context/GameContext";
import { RiResetLeftLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Stopwatch from "./components/Stopwatch";
import { useCallback, useState } from "react";
import BaseGameBoard from "./components/BaseGameBoard";
import { processStats } from "../utils/processGameStats";
import { postGameStats } from "../services/postGameService";
import { calculateDifficulty } from "./logic/calculateDifficulty";
import { boardToArray } from "./utils/boardToArray";
import { useAuthContext } from "../context/AuthContext";

export default function GameApp() {
  const { user } = useAuthContext();
  const { resetGame, bombsLeft, gameWin, board, bombs, isGameActive } =
    useGameContext();
  const [resetTrigger, setResetTrigger] = useState(0);
  const [gameConfig, setGameConfig] = useState({
    width: 16,
    height: 16,
    bombs: 40,
  });

  function handleReset() {
    setResetTrigger((prev) => prev + 1);
    resetGame(gameConfig.width, gameConfig.height, gameConfig.bombs);
  }

  function handleChangeGameMode(e) {
    const value = e.target.value;
    const newConfig = {
      a: { width: 9, height: 9, bombs: 10 },
      b: { width: 16, height: 16, bombs: 40 },
      c: { width: 30, height: 16, bombs: 99 },
    }[value];

    setGameConfig(newConfig);
    setResetTrigger((prev) => prev + 1);
    resetGame(newConfig.width, newConfig.height, newConfig.bombs);
  }

  const uploadGame = useCallback(
    (time) => {
      if (gameWin) {
        const stats = {
          bombs: bombs,
          bbbv: calculateDifficulty(board),
          board: JSON.stringify(boardToArray(board)),
          time: time,
        };
        async function postGame() {
          try {
            const gameData = processStats(stats, user);
            const response = await postGameStats(gameData);
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
    [gameWin]
  );

  return (
    <div>
      <div className='custom-border bg-gray-300 p-3 w-full grid grid-cols-4 gap-2 text-center'>
        <div className='custom-border-rev bg-white flex items-center justify-center gap-2'>
          {bombsLeft} <FaStar />
        </div>
        <Stopwatch
          active={isGameActive}
          resetTrigger={resetTrigger}
          callback={uploadGame}
        />
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
