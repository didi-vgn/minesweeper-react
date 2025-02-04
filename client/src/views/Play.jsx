import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";
import { useStatsContext } from "../game/context/StatsContext";
import GameApp from "../game/GameApp";
import { postGameStats } from "../services/postGameService";
import { processStats } from "../utils/processGameStats";
import Header from "../components/Header";
import ProfileButton from "../components/ProfileButton";

export default function Play() {
  const { user } = useAuthContext();
  const { stats } = useStatsContext();

  const onSubmit = async () => {
    try {
      const gameData = processStats(stats, user);
      const response = await postGameStats(gameData);
      if (response === 201) {
        alert("Game added!");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='flex justify-center m-10'>
        <GameApp />
      </div>
      <Button onClick={onSubmit} text='Post Game' />
    </div>
  );
}
