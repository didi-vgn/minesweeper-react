import { useState } from "react";
import { icons } from "../utils/assets";

export default function Select({ init, arr, callback }) {
  const [selected, setSelected] = useState(
    arr.findIndex((el) => el.value === init)
  );

  function handleChange(val) {
    const newPos = selected + val;
    if (newPos >= arr.length) {
      setSelected(0);
      callback(arr[0].value);
    } else if (newPos < 0) {
      setSelected(arr.length - 1);
      callback(arr[arr.length - 1].value);
    } else {
      setSelected(newPos);
      callback(arr[newPos].value);
    }
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='flex items-center gap-2'>
        <div
          className='text-5xl cursor-pointer'
          onClick={() => handleChange(-1)}
        >
          {"<"}
        </div>

        <img
          src={icons[arr[selected].value]}
          alt={icons[arr[selected].name]}
          className='size-25 custom-border-rev'
        />
        <div
          className='text-5xl cursor-pointer'
          onClick={() => handleChange(+1)}
        >
          {">"}
        </div>
      </div>
      <div className='text-center'>{arr[selected].name}</div>
    </div>
  );
}
