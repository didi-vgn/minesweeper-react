import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Dropdown({ text, children }) {
  const [expand, setExpand] = useState(false);
  const dropdownRef = useRef(null);

  function toggleDropdown() {
    setExpand(!expand);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpand(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className='relative inline-flex flex-col items-center text-gray-600 text-center hover:bg-gray-300 m-1 gap-2'
    >
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
              focus:outline-none z-100'
        >
          {children}
        </div>
      )}
    </div>
  );
}
