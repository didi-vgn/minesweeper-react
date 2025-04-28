export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='custom-border flex items-center justify-center gap-1 font-semibold p-1 bg-gray-300 cursor-pointer m-auto w-40 active:border-l-gray-400 active:border-t-gray-400 active:border-r-gray-200 active:border-b-gray-200 active:scale-95'
    >
      {text}
    </button>
  );
}
