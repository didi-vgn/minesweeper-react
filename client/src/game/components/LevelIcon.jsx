import { useState } from "react";
import { colors } from "../utils/assets";
import { adventureLevels } from "../utils/levelsData";

export default function LevelIcon({ onClick, level, data }) {
  const [hover, setHover] = useState(false);

  const style = data
    ? "custom-border-emerald bg-emerald-500"
    : "custom-border bg-gray-300";

  return (
    <div
      className={`flex flex-col justify-around items-center size-20 cursor-pointer ${style}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(hover &&
        ((!data > 0 && (
          <div className='flex flex-col gap-1 items-center'>
            <div className='text-xl font-bold'>Play</div>
            <div className='text-sm'>0/{adventureLevels[level - 1].gems}</div>
          </div>
        )) || (
          <div className='flex flex-col items-center'>
            <div className='text-xl font-bold'>Replay</div>
            <div className='text-sm'>
              {data.collectedGems}/{adventureLevels[level - 1].gems}
            </div>
            <div className='text-sm'>{data.points}</div>
          </div>
        ))) || (
        <>
          <div
            className={`text-4xl font-outline-black ${
              colors[((level - 1) % 8) + 1]
            }`}
          >
            {level}
          </div>
        </>
      )}
    </div>
  );
}
