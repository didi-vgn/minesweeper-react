import PrettyTitle from "../../game/components/PrettyTitle";
import { playSoundEffect } from "../../game/utils/assets";

export default function AdventureMenu({ play, settings, info, sfx }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-8xl m-15'>
        <PrettyTitle string='Adventure' />
      </div>
      <div
        className='text-6xl m-3 cursor-pointer hover:scale-150'
        onClick={play}
        onMouseEnter={() => playSoundEffect("click", sfx)}
      >
        Play
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
