export default function Header({ children }) {
  return (
    <div className='grid grid-cols-5 items-center bg-gray-200 w-full h-10 text-center'>
      {children}
    </div>
  );
}
