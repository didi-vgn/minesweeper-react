import GameApp from "../game/GameApp";
import Header from "../components/Header";
import ProfileButton from "../components/ProfileButton";

export default function Play() {
  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='flex justify-center m-10'>
        <GameApp />
      </div>
    </div>
  );
}
