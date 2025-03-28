import { useEffect, useState } from "react";
import { getUserAchievements } from "../../services/adventureGamesServices";
import { useNavigate } from "react-router-dom";
import Achievement from "../../components/Achievement";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileAchievements() {
  const { user } = useAuthContext();
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAchievements(userId) {
      try {
        const response = await getUserAchievements(userId);
        setAchievements(response.achievements);
      } catch (err) {
        console.error(err);
      }
    }
    user && fetchAchievements(user.id);
  }, [user]);

  function goToAdventure() {
    navigate("/adventure");
  }
  return (
    <div className='flex gap-5 flex-wrap w-8/10 m-auto'>
      {achievements.length === 0 && (
        <div className='flex flex-col items-center mx-auto my-20'>
          <div className='text-2xl text-pink-600'>
            No achievements unlocked yet...
          </div>
          <div
            className='cursor-pointer hover:underline'
            onClick={goToAdventure}
          >
            Click here to start playing!
          </div>
        </div>
      )}
      {achievements.map((a, i) => {
        if (
          a.achievementId.substring(0, a.achievementId.length - 1) ===
          achievements[i + 1]?.achievementId.substring(
            0,
            a.achievementId.length - 1
          )
        ) {
          return;
        } else {
          return <Achievement key={a.achievementId} data={a} />;
        }
      })}
    </div>
  );
}
