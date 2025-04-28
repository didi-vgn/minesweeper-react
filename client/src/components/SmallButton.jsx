export default function SmallButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='custom-border bg-gray-300 place-self-start px-2 text-center cursor-pointer active:border-l-gray-400 active:border-t-gray-400 active:border-r-gray-200 active:border-b-gray-200 active:scale-95'
    >
      {text}
    </button>
  );
}
