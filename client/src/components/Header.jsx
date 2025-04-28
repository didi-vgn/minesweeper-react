export default function Header({ children }) {
  return (
    <div className='grid grid-cols-4 items-center bg-gray-200 w-full h-10 text-center text-gray-600'>
      {children}
    </div>
  );
}
