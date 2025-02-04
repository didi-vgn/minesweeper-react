export default function LargeButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='custom-border flex items-center justify-center gap-1 font-semibold p-3 bg-gray-300 cursor-pointer m-auto w-50 mt-5 mb-5'
    >
      {text}
    </button>
  );
}
