import SCover from "./SCover";
import SEmpty from "./SEmpty";

export default function SCell({ cell, player }) {
  return cell.clicked ? (
    <div className='w-[64px] h-[64px]'>
      <SEmpty player={player} cell={cell} />
    </div>
  ) : (
    <div className='w-[64px] h-[64px]'>
      <SCover />
    </div>
  );
}
