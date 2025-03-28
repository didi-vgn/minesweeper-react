import { useState } from "react";
import { useAdventureContext } from "../../game/context/AdventureContext";
import { adventureLevels } from "../../game/utils/levelsData";
import PrettyTitle from "../../game/components/PrettyTitle";
import { colors, playSoundEffect } from "../../game/utils/assets";

export default function AdventureLevelSelection({ back, progress, play }) {
  const { newGame } = useAdventureContext();

  function selectLevel(levelData) {
    newGame(levelData);
    play();
  }

  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3'>
        <div
          className='custom-border bg-gray-300 place-self-start px-3 cursor-pointer'
          onClick={back}
        >
          Back
        </div>
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='Play' />
        </div>
        <div className='grid grid-rows-2 place-self-end'>
          <div>
            {progress.reduce((acc, curr) => acc + curr.points, 0)} points
          </div>
          <div>
            {progress.reduce((acc, curr) => acc + curr.collectedGems, 0)}/
            {adventureLevels.reduce((acc, curr) => acc + curr.gems, 0)} gems
          </div>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-3 m-5'>
        {adventureLevels.map((level, index) => (
          <LevelIcon
            key={index + 1}
            onClick={() => selectLevel(level)}
            level={level.id}
            data={progress.find((level) => level.levelId === index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

function LevelIcon({ onClick, level, data }) {
  const { settings } = useAdventureContext();
  const [hover, setHover] = useState(false);

  const style = data
    ? "custom-border-emerald bg-emerald-500"
    : "custom-border bg-gray-300";

  return (
    <div
      className={`flex flex-col justify-around items-center size-25 cursor-pointer ${style}`}
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
        playSoundEffect("click", settings.sfx);
      }}
      onMouseLeave={() => setHover(false)}
    >
      {(hover &&
        ((!data > 0 && (
          <div className='flex flex-col gap-1 items-center'>
            <div className='text-xl font-bold'>Play</div>
            <div className='text-sm'>0/{adventureLevels[level - 1].gems} G</div>
          </div>
        )) || (
          <div className='flex flex-col items-center'>
            <div className='text-xl font-bold'>Replay</div>
            <div className='text-sm'>
              {data.collectedGems}/{adventureLevels[level - 1].gems} G
            </div>
            <div className='text-sm'>{data.points} P</div>
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
