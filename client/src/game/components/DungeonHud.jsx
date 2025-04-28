import { IoMdArrowBack } from "react-icons/io";
import Overlay from "./Overlay";
import { gemColors, other } from "../utils/assets";
import { FaArrowRotateRight } from "react-icons/fa6";

export default function DungeonHud({
  back,
  gems,
  timer,
  depth,
  scanners,
  reset,
}) {
  return (
    <Overlay>
      <div className='flex justify-between items-center bg-[rgba(0,0,0,0.3)] py-1'>
        <div
          className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-r-xl hover:bg-gray-200 cursor-pointer'
          onClick={back}
        >
          <IoMdArrowBack />
        </div>
        <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
          {gems}
          <img src={gemColors.rainbow} alt='' className='size-10' />
        </div>
        <div className='text-3xl font-outline flex gap-5'>
          {timer}
          <div>Depth: {depth}</div>
        </div>
        <div className='flex gap-2 items-center justify-center text-3xl w-35 h-10 font-outline'>
          {scanners}
          <img src={other.scanner} alt='' className='size-10' />
        </div>
        <div
          className='flex justify-center items-center size-12 bg-gray-100 text-2xl rounded-l-xl hover:bg-gray-200 cursor-pointer'
          onClick={reset}
        >
          <FaArrowRotateRight />
        </div>
      </div>
    </Overlay>
  );
}
