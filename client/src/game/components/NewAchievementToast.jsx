import { useNavigate } from "react-router-dom";

export default function NewAchievementToast({ data, closeToast }) {
  const navigate = useNavigate();
  return (
    <div className='font-mono'>
      <div className='flex items-center gap-1 justify-center'>
        <img
          src={`/achievements/${data.id}.png`}
          alt={`${data.title}`}
          className='size-17'
        />
        <div>
          <div className='text-lg font-bold text-center'>
            Achievement unlocked!
          </div>
          <div className='text-sm text-center'>{data.title}</div>
          <div
            className='text-sm text-center text-gray-500 mt-2 cursor-pointer hover:underline'
            onClick={() => {
              navigate("/profile");
              closeToast();
            }}
          >
            Click to view achievements
          </div>
        </div>
      </div>
    </div>
  );
}
