import { useGameContext } from "../context/GameContext";
import { RiResetLeftLine } from "react-icons/ri";
import BombsLeft from "./BombsLeft";
import Select from "./Select";
import Stopwatch from "./Stopwatch";
import { useState } from "react";

export default function Header2() {
  const { resetGame, isGameActive, bombsLeft } = useGameContext();
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

  function handleGameMode(e) {
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

  return (
    <div className='custom-border bg-white p-3 w-full rounded-md grid grid-cols-4 text-center '>
      <BombsLeft>{bombsLeft}</BombsLeft>
      <Stopwatch isGameActive={isGameActive} resetTrigger={resetTrigger} />
      <Select onChange={handleGameMode} />
      <button
        onClick={handleReset}
        className='flex justify-center items-center'
      >
        <RiResetLeftLine />
      </button>
    </div>
  );
}
