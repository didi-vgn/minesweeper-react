export default function Notifications({ children }) {
  return (
    <div className='flex flex-col gap-3 p-3' style={style}>
      {children}
    </div>
  );
}

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "30rem",
};
