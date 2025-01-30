export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center gap-1 font-semibold p-1 text-white bg-pink-600 rounded-md hover:bg-pink-800 m-auto w-50 mt-5'
    >
      {text}
    </button>
  );
}
