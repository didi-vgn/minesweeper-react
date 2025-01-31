import { PiStarBold } from "react-icons/pi";

export default function Cell({ cell }) {
  return (
    <div>
      {cell.clicked && cell.value === -1 ? (
        <div className='flex items-center justify-center size-9 bg-pink-50 text-3xl text-pink-600 border rounded-sm rm-pink-600'>
          <PiStarBold />
        </div>
      ) : cell.value === 0 ? (
        <div className='flex items-center justify-center size-9 bg-pink-50 text-3xl text-pink-600 border rounded-sm rm-pink-600'></div>
      ) : (
        <div className='flex items-center justify-center size-9 bg-pink-50 text-3xl text-pink-600 border rounded-sm rm-pink-600'>
          {" "}
          {cell.value}
        </div>
      )}
      {!cell.clicked && (
        <div className='flex items-center justify-center size-9 bg-blue-300 text-3xl text-blue-600 border rounded-sm rm-blue-600'></div>
      )}
    </div>
  );
}
