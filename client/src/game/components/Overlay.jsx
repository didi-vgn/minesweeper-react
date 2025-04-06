export default function Overlay({ children }) {
  return (
    <div className='absolute top-0 left-0 h-full w-full z-90'>{children}</div>
  );
}
