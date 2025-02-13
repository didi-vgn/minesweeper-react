import { useState } from "react";

export default function LevelIcon({ onClick, level, icon, completed }) {
  const [hover, setHover] = useState(false);

  const style = completed
    ? "custom-border-emerald bg-emerald-500"
    : "custom-border bg-gray-300";

  return (
    <div
      className={`flex flex-col justify-around items-center size-30 cursor-pointer ${style}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(hover &&
        ((!completed && <div className='text-3xl'>Play</div>) || (
          <div className='text-3xl'>Replay</div>
        ))) || (
        <>
          <div className='text-xl'>{level}</div>
          <div className='text-6xl'>{icon}</div>
        </>
      )}
    </div>
  );
}
