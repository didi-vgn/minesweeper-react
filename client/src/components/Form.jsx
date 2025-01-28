export default function Form({ children, onClick, buttonText }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate className='container'>
      <div className='grid gap-5 md:grid-cols-2 mt-20'>{children}</div>
      <button
        onClick={onClick}
        className='flex items-center justify-center gap-1 font-semibold p-5 text-white bg-pink-600 rounded-md hover:bg-pink-800 m-auto w-50 mt-5'
      >
        {buttonText}
      </button>
    </form>
  );
}
