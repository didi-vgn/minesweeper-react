import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";

export default function Triangle({ order }) {
  return (
    <div className='text-slate-400 text-3xl absolute top-0 right-15'>
      {order === "asc" && <RxTriangleUp />}
      {order === "desc" && <RxTriangleDown />}
    </div>
  );
}
