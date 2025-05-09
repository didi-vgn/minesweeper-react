import { useState } from "react";
const BASE_PATH = import.meta.env.BASE_URL;

export default function Achievement({ data }) {
  const [click, setClick] = useState(false);
  return (
    <div
      className='flex justify-center w-60 h-50 bg-gray-100 rounded-3xl shadow-md p-2 cursor-pointer'
      onClick={() => setClick(!click)}
    >
      {!click ? (
        <div className='grid grid-rows-[1fr_3rem] gap-1 items-center'>
          <img
            src={`${BASE_PATH}/achievements/${data.achievement.id}.png`}
            alt={data.achievement.title}
            className='size-30 m-auto'
          />
          <div className='font-bold text-xl text-center'>
            {data.achievement.title}
          </div>
        </div>
      ) : (
        <div className='grid grid-rows-[1fr_0.5fr_0.5fr] gap-1 items-center'>
          <div className='flex gap-2 items-center'>
            <img
              src={`${BASE_PATH}/achievements/${data.achievement.id}.png`}
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
