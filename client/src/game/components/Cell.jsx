import { FaStar } from "react-icons/fa";
import { HiFlag } from "react-icons/hi";
import { colors } from "../utils/assets";

export default function Cell({ cell, onClick, onRightClick }) {
  return (
    <div
      className='flex items-center justify-center'
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {(cell.clicked && (
        <div className='flex items-center justify-center size-8 border bg-gray-300 border-gray-400 text-xl font-extrabold'>
          <div className={`${colors[cell.value]}`}>
            {cell.value === 0 ? (
              ""
            ) : cell.value === -1 ? (
              <FaStar />
            ) : (
              cell.value
            )}
          </div>
        </div>
      )) || (
        <div className='custom-border flex items-center justify-center size-8 text-xl text-pink-600 bg-gray-300'>
          {cell.flagged && <HiFlag />}
        </div>
      )}
    </div>
  );
}
