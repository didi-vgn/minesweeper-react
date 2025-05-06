import { useEffect, useState } from "react";

export default function GameOverScreen() {
  const [frameIndex, setFrameIndex] = useState(0);

  const handleImageChange = () => {
    const newIndex = frameIndex + 512;
    setFrameIndex(newIndex === 1536 ? 0 : newIndex);
  };

  useEffect(() => {
    const interval = setInterval(handleImageChange, 500);
    return () => clearInterval(interval);
  }, [handleImageChange]);

  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-30'>
      <div className='overflow-hidden w-[512px] h-[512px]'>
        <div
          className='w-[1536px] h-[512px] bg-[url(/minesweeper-react/other/game_over.png)] mt-15'
          style={{ transform: `translateX(-${frameIndex}px)` }}
        ></div>
      </div>
    </div>
  );
}
