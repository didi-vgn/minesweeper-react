import LargeButton from "../components/LargeButton";
import { useAuthContext } from "../context/AuthContext";
import GameApp from "../game/GameApp";
import { postGameStats } from "../services/postGameService";

export default function Play() {
  const { user } = useAuthContext();

  const mockGameData = {
    userId: user ? user.id : null,
    mode: "BEGGINER",
    time: 170,
    bbbv: 21,
    points: 2,
  };

  const onSubmit = async () => {
    try {
      const response = await postGameStats(mockGameData);
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
      <div className='container flex items-center m-10'>
        {user ? (
          <div className='text-3xl text-bold text-gray-600'>
            Authenticated as {user.nickname}
          </div>
        ) : (
          <div className='text-3xl text-bold text-gray-600'>
            Not authenticated
          </div>
        )}
        <LargeButton onClick={onSubmit} text='Post Game' />
      </div>
      <GameApp />
    </div>
  );
}
