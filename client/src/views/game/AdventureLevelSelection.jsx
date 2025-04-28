import { useState } from "react";
import { useAdventureContext } from "../../game/context/AdventureContext";
import { adventureLevels } from "../../game/utils/levelsData";
import { colors, playSoundEffect } from "../../game/utils/assets";
import SmallButton from "../../components/SmallButton";
import PrettyTitle from "../../components/PrettyTitle";

export default function AdventureLevelSelection({ back, progress, play }) {
  const { actions } = useAdventureContext();

  function selectLevel(levelData) {
    actions.newGame(levelData);
    play();
  }

  return (
    <div className='text-xl'>
      <div className='grid grid-cols-3'>
        <SmallButton onClick={back} text='Back' />
        <div className='text-5xl place-self-center'>
          <PrettyTitle string='Adventure' />
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
      <div className='grid grid-cols-10 gap-3 m-5'>
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
    ? "custom-border-lg-lime bg-lime-500 active:border-l-lime-400 active:border-t-lime-400 active:border-r-lime-200 active:border-b-lime-200 active:scale-95"
    : "custom-border-lg bg-gray-300 active:border-l-gray-400 active:border-t-gray-400 active:border-r-gray-200 active:border-b-gray-200 active:scale-95";

  return (
    <div
      className={`flex flex-col justify-around items-center size-30 cursor-pointer ${style}`}
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
        playSoundEffect("click", settings.sfx);
      }}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        !data ? (
          <div className='flex flex-col gap-1 items-center'>
            <div className='text-2xl font-bold'>Play</div>
            <div className='text-sm'>0/{adventureLevels[level - 1].gems} G</div>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-bold'>Replay</div>
            <div className='text-sm'>
              {data.collectedGems}/{adventureLevels[level - 1].gems} G
            </div>
            <div className='text-sm'>{data.points} P</div>
          </div>
        )
      ) : (
        <div
          className={`text-5xl font-outline-black ${
            colors[((level - 1) % 8) + 1]
          }`}
        >
          {level}
        </div>
      )}
    </div>
  );
}
