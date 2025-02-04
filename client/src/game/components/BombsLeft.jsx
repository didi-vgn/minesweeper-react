import { FaStar } from "react-icons/fa";

export default function BombsLeft({ children }) {
  return (
    <div className='custom-border-rev bg-white flex items-center justify-center gap-2'>
      {children} <FaStar />
    </div>
  );
}
