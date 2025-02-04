import { HiFlag } from "react-icons/hi";

export default function Flag({ size = 8 }) {
  return (
    <div className='custom-border flex items-center justify-center size-8 text-xl text-pink-600 bg-gray-300'>
      <HiFlag />
    </div>
  );
}
