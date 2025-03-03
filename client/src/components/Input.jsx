import { MdOutlineErrorOutline } from "react-icons/md";
import { useFormContext } from "react-hook-form";

export default function Input({ label, type, id, placeholder, validation }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[id];

  return (
    <div className='flex flex-col gap-2 m-3'>
      <label htmlFor={id} className='font-semibold capitalize'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className='custom-border-rev w-full bg-white p-3 font-medium border-gray-800 placeholder:opacity-60'
        {...register(id, validation)}
      />
      {(error && (
        <div className='flex items-center justify-end gap-1 text-pink-600 text-sm h-5'>
          <MdOutlineErrorOutline /> {error.message}
        </div>
      )) ||
        (!error && <div className='h-5'></div>)}
    </div>
  );
}
