export default function LargeButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='custom-border flex items-center justify-center font-semibold p-2 bg-gray-300 cursor-pointer m-auto w-50'
    >
      {text}
    </button>
  );
}
