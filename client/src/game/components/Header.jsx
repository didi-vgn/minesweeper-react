import BombsLeft from "./BombsLeft";
import Select from "./Select";
import Stopwatch from "./Stopwatch";

export default function Header() {
  return (
    <div className='bg-white p-3 w-full rounded-md grid grid-cols-3 text-center '>
      <BombsLeft />
      <Stopwatch />
      <Select />
    </div>
  );
}
