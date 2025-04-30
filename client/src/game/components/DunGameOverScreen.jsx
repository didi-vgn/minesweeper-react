import { useEffect, useState } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import { useInterval } from "../hooks/useInterval";
const BASE_PATH = import.meta.env.BASE_URL;

export default function DunGameOverScreen() {
  const [frameIndex, setFrameIndex] = useState(0);
  const { gameState } = useAdventureContext();
  const [points, setPoints] = useState(0);

  const handleImageChange = () => {
    const newIndex = frameIndex + 512;
    setFrameIndex(newIndex === 1536 ? 0 : newIndex);
  };

  useEffect(() => {
    const interval = setInterval(handleImageChange, 300);
    return () => clearInterval(interval);
  }, [handleImageChange]);

  useInterval(
    () => {
      const newPoints = points + Math.ceil(Math.random() * 100);

      if (newPoints > gameState.score) {
        setPoints(gameState.score);
      } else setPoints(newPoints);
    },
    points < gameState.score ? 5 : null
  );

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[rgba(0,0,0,0.5)] z-30'>
      <div className='overflow-hidden w-[512px] h-[512px]'>
        <div
          className={`w-[1536px] h-[512px] bg-[url(${BASE_PATH}/other/game_over.png)] mt-15`}
          style={{ transform: `translateX(-${frameIndex}px)` }}
        ></div>
      </div>
      <div className='text-6xl text-slate-100 translate-y-[-8rem]'>
        {points} points!
      </div>
      <div className='text-3xl text-center text-slate-100 translate-y-[-5rem]'>
        {gameState.score >= 1000
          ? "Score added to the Leaderboard!"
          : "You need to earn at least 1000 points to enter the Leaderboard."}
      </div>
    </div>
  );
}
