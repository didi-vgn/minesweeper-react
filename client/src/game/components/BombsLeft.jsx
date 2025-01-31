import { PiStarBold } from "react-icons/pi";

export default function BombsLeft() {
  const bombsLeft = 99;

  return (
    <div className='flex items-center justify-center gap-2'>
      {bombsLeft} <PiStarBold />
    </div>
  );
}
