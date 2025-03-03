import { useState } from "react";

export default function Achievement({ data }) {
  const [click, setClick] = useState(false);
  return (
    <div
      className='flex flex-col items-center gap-3 w-60 h-50 bg-gray-100 rounded-3xl shadow-md p-2 cursor-pointer'
      onClick={() => setClick(!click)}
    >
      {!click && (
        <div className='flex flex-col gap-1 items-center'>
          <img
            src={`/achievements/${data.achievement.id}.png`}
            alt={data.achievement.title}
            className='size-30 m-auto'
          />
          <div className='font-bold text-xl text-center'>
            {data.achievement.title}
          </div>
        </div>
      )}
      {click && (
        <div className='grid grid-rows-3 gap-1 items-center'>
          <div className='flex gap-2 items-center'>
            <img
              src={`/achievements/${data.achievement.id}.png`}
              alt={data.achievement.title}
              className='size-13'
            />
            <div className='font-bold text-lg'>{data.achievement.title}</div>
          </div>
          <div className='text-md text-gray-500 text-center'>
            {data.achievement.description}
          </div>
          <div className='text-sm text-gray-400 text-center'>
            Unlocked: {data.earnedAt.split("T")[0]}
          </div>
        </div>
      )}
    </div>
  );
}
