import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function NewAchievementNotification({ data }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;
    const showTimer = setTimeout(() => setVisible(true), 10);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className='bg-gray-100 p-2 rounded-lg shadow-md grid grid-cols-[1fr_20px]'
      style={visible ? visibleStyle : hiddenStyle}
    >
      <div className='flex items-center gap-1 justify-center'>
        <img
          src={`achievements/${data?.id}.png`}
          alt={`${data?.title}`}
          className='size-17'
        />
        <div>
          <div className='text-sm text-xl font-bold'>Achievement unlocked!</div>
          <div className='text-sm text-center'>{data?.title}</div>
          <div
            className='text-sm text-center text-gray-500 mt-2 cursor-pointer'
            onClick={() => navigate("/profile")}
          >
            Click to view achievements
          </div>
        </div>
      </div>
      <div>
        <div
          className='cursor-pointer text-2xl'
          onClick={() => setVisible(false)}
        >
          <IoClose />
        </div>
      </div>
    </div>
  );
}

const hiddenStyle = {
  transition: "transform 0.2s ease-in",
  zIndex: 50,
  transform: "translateX(130%)",
};

const visibleStyle = {
  transition: "transform 0.2s ease-out",
  zIndex: 50,
  transform: "translateX(0%)",
};
