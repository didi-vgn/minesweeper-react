import PrettyTitle from "../../game/components/PrettyTitle";
import { playSoundEffect } from "../../game/utils/assets";

export default function GameMenu({
  classic,
  adventure,
  dungeon,
  settings,
  info,
  sfx,
}) {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-8xl m-15'>
        <PrettyTitle string='Minesweeper' />
      </div>
      <div
        className='text-6xl m-3 cursor-pointer hover:scale-150'
        onClick={classic}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Classic
      </div>
      <div
        className='text-6xl m-3 cursor-pointer hover:scale-150'
        onClick={adventure}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Adventure
      </div>
      <div
        className='text-6xl m-3 cursor-pointer hover:scale-150'
        onClick={dungeon}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Dungeon
      </div>
      <div
        className='text-4xl m-3 cursor-pointer hover:scale-150'
        onClick={settings}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Settings
      </div>
      <div
        className='text-4xl m-3 cursor-pointer hover:scale-150'
        onClick={info}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        How to Play
      </div>
    </div>
  );
}
