import { useEffect, useState } from "react";
import Button from "../../components/Button";
import {
  deleteAchievementId,
  getAllAchievements,
} from "../../services/adventureGamesServices";
import errorHandler from "../../utils/errorHandler";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const { token } = useAuthContext();
  const [trigger, setTrigger] = useState(0);

  function refresh() {
    setTrigger((prev) => prev + 1);
  }

  async function deleteAchievement(id) {
    try {
      await deleteAchievementId(id, token);
      toast.success(`Achievement ID ${id} deteled.`);
      refresh();
    } catch (err) {
      errorHandler(err);
    }
  }

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await getAllAchievements();
        setAchievements(response.achievements);
      } catch (err) {
        errorHandler(err);
      }
    }
    fetchAchievements();
  }, [trigger]);

  return (
    <div>
      <div className='grid grid-cols-[70px_1fr_1fr_1fr_170px] gap-2 items-center my-1 p-1 border-b font-bold'>
        <div>Icon</div>
        <div>Title</div>
        <div>Description</div>
        <div>ID</div>
      </div>
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className='grid grid-cols-[70px_1fr_1fr_1fr_170px] gap-2 items-center my-1 bg-white p-1 shadow-sm'
        >
          <img
            src={`/achievements/${achievement.id}.png`}
            alt={`${achievement.title}`}
            className='size-15'
          />
          <div className='font-bold'>{achievement.title}</div>
          <div className='text-gray-500'>{achievement.description}</div>
          <div>{achievement.id}</div>
          <Button
            onClick={() => deleteAchievement(achievement.id)}
            text='Delete'
          />
        </div>
      ))}
    </div>
  );
}
