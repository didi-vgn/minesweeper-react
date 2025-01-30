import { MdOutlineErrorOutline } from "react-icons/md";

export default function Form({ children, onClick, buttonText, errors = [] }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className='container'>
      <div className='grid gap-5 md:grid-cols-2 mt-20'>{children}</div>
      <button
        onClick={onClick}
        className='flex items-center justify-center gap-1 font-semibold p-5 text-white bg-pink-600 rounded-md hover:bg-pink-800 m-auto w-50 mt-5'
      >
        {buttonText}
      </button>
      {errors &&
        errors.map((error, index) => {
          return (
            <div
              key={index}
              className='flex justify-center items-center text-pink-600 text-4xl font-bold m-10 gap-3'
            >
              <MdOutlineErrorOutline />
              {error.error}
            </div>
          );
        })}
    </form>
  );
}
