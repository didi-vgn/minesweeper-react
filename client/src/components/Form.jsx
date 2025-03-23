import LargeButton from "./LargeButton";

export default function Form({ children, onClick, buttonText }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <div className='flex flex-col items-center'>{children}</div>
      <LargeButton onClick={onClick} text={buttonText} />
    </form>
  );
}
