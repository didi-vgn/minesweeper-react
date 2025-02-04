import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Dropdown({ text, children }) {
  const [expand, setExpand] = useState(false);
  function toggleDropdown() {
    setExpand(!expand);
  }

  return (
    <div className='relative inline-flex flex-col items-center text-gray-600 text-center hover:bg-gray-300 m-1 gap-2'>
      <div
        onClick={toggleDropdown}
        className='cursor-pointer flex items-center gap-1'
      >
        {text}
        <div className='text-2xl'>
          <RiArrowDropDownLine />
        </div>
      </div>

      {expand && (
        <div
          className='absolute top-full w-40 
              shadow-lg bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none'
        >
          {children}
        </div>
      )}
    </div>
  );
}
