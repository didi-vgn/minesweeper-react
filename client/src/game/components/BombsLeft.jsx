import { FaStar } from "react-icons/fa";

export default function BombsLeft({ children }) {
  return (
    <div className='flex items-center justify-center gap-2'>
      {children} <FaStar />
    </div>
  );
}
