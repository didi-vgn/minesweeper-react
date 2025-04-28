import { useGameContext } from "./context/GameContext";
import { FaStar } from "react-icons/fa";
import Stopwatch from "./components/Stopwatch";
import { useState } from "react";
import {
  postGameStats,
  postGameStatsGuest,
} from "../services/baseGameServices";
import { calculateDifficulty } from "./logic/calculateDifficulty";
import { boardToArray } from "./utils/boardToArray";
import { useAuthContext } from "../context/AuthContext";
import { FaArrowRotateRight } from "react-icons/fa6";
import Cell from "./components/Cell";
import { formatTime } from "../utils/formatTime";
import errorHandler from "../utils/errorHandler";
import SmallButton from "../components/SmallButton";

export default function ClassicApp({ back }) {
  const { token } = useAuthContext();
  const { gameState, config, setConfig, actions } = useGameContext();
  const [resetTrigger, setResetTrigger] = useState(0);

  function handleReset() {
    setResetTrigger((prev) => prev + 1);
    actions.resetGame();
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
    actions.resetGame(newConfig.width, newConfig.height, newConfig.bombs);
  }

  function uploadGame(time) {
    if (time === 0) return;
    async function postGame() {
      try {
        const bbbv = calculateDifficulty(gameState.board);
        const stats = {
          difficulty:
            config.bombs === 10
              ? "BEGINNER"
              : config.bombs === 40
              ? "INTERMEDIATE"
              : "EXPERT",
          time: formatTime(time),
          bbbv: bbbv,
          points: Number((Math.round((bbbv / time) * 100) / 100).toFixed(2)),
          board: JSON.stringify(boardToArray(gameState.board)),
        };
        let response;
        if (token) {
          response = await postGameStats(stats, token);
        } else {
          response = await postGameStatsGuest(stats);
        }
      } catch (err) {
        errorHandler(err);
      }
    }
    postGame();
  }

  return (
    <div className='text-xl'>
      <div className='grid grid-cols-2 mb-10'>
        <SmallButton text='Back' onClick={back} />
      </div>
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='grid grid-cols-4 gap-3'>
          <div className='text-2xl flex items-center justify-center gap-2 place-self-end border rounded-md p-1 w-28'>
            {gameState.bombsLeft} <FaStar />
          </div>
          <div className='text-3xl place-self-center text-center border rounded-md p-1 w-28'>
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
            className='text-2xl border rounded-md p-1'
          >
            <option value='a'>9x9 10 mines</option>
            <option value='b'>16x16 40 mines</option>
            <option value='c'>16x30 99 mines</option>
          </select>
          <SmallButton
            text={<FaArrowRotateRight className='size-7 my-1' />}
            onClick={handleReset}
          />
        </div>
        <div className='bg-gray-300 p-1 custom-border'>
          <div className='flex flex-col m-5 custom-border-rev select-none'>
            {gameState.board.map((row, i) => (
              <div className='flex' key={i}>
                {row.map((cell, j) => (
                  <Cell
                    key={`${i}-${j}`}
                    cell={cell}
                    onClick={() => actions.handleLeftClick(i, j)}
                    onRightClick={(e) => actions.handleRightClick(e, i, j)}
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
