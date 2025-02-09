import AdventureApp from "../game/AdventureApp";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Level() {
  const navigate = useNavigate();
  function goBack() {
    navigate("/adventure");
  }

  return (
    <div className='m-5'>
      <div
        className='flex justify-center items-center size-10 custom-border bg-gray-300 text-2xl'
        onClick={goBack}
      >
        <IoMdArrowRoundBack />
      </div>
      <AdventureApp />
    </div>
  );
}
