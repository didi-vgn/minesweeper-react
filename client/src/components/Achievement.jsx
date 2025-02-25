import { useState } from "react";

export default function Achievement({ data }) {
  const [click, setClick] = useState(false);
  return (
    <div
      className='flex flex-col items-center gap-3 w-70 h-53 bg-gray-100 rounded-3xl shadow-lg p-3 cursor-pointer'
      onClick={() => setClick(!click)}
    >
      {!click && (
        <div className='grid grid-rows-[3fr_1fr] gap-2 items-center'>
          <img src={data.image} alt={data.title} className='size-35 m-auto' />
          <div className='font-bold text-2xl text-center'>{data.title}</div>
        </div>
      )}
      {click && (
        <div className='grid grid-rows-[1fr_1fr_1fr] gap-3 items-center'>
          <div className='flex gap-5 items-center'>
            <img src={data.image} alt={data.title} className='size-15' />
            <div className='font-bold text-2xl'>{data.title}</div>
          </div>
          <div className='text-lg text-gray-500 text-center'>
            {data.description}
          </div>
          <div className='text-sm text-gray-400 text-center'>
            Acquired on: {data.date}
          </div>
        </div>
      )}
    </div>
  );
}
