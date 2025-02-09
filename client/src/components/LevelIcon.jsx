import { useState } from "react";

export default function LevelIcon({ onClick, level, icon }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className='flex flex-col justify-around items-center custom-border bg-gray-300 size-30 cursor-pointer'
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(hover && <div className='text-3xl'>Play</div>) || (
        <>
          <div className='text-xl'>{level}</div>
          <div className='text-6xl'>{icon}</div>
        </>
      )}
    </div>
  );
}
