export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='custom-border flex items-center justify-center gap-1 font-semibold p-1 bg-gray-300 cursor-pointer m-auto w-40'
    >
      {text}
    </button>
  );
}
