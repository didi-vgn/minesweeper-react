import { MdOutlineErrorOutline } from "react-icons/md";
import LargeButton from "./LargeButton";

export default function Form({ children, onClick, buttonText, errors = [] }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className='container'>
      <div className='grid gap-5 md:grid-cols-2 mt-20'>{children}</div>
      <LargeButton onClick={onClick} text={buttonText} />
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
