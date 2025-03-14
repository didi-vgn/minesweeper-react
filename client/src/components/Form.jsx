import { MdOutlineErrorOutline } from "react-icons/md";
import LargeButton from "./LargeButton";

export default function Form({ children, onClick, buttonText, errors = [] }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <div className='flex flex-col items-center'>{children}</div>

      <LargeButton onClick={onClick} text={buttonText} />
      <div className='h-10 mt-5'>
        {errors &&
          errors.map((error, index) => {
            return (
              <div
                key={index}
                className='flex justify-center items-center text-pink-600 text-3xl font-bold gap-3'
              >
                <MdOutlineErrorOutline />
                {error.error}
              </div>
            );
          })}
      </div>
    </form>
  );
}
