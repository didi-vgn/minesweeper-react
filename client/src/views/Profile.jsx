import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";
import { useState } from "react";
import ProfileButton from "../components/ProfileButton";

export default function Profile() {
  const { user } = useAuthContext();
  const [selectedGameMode, setSelectedGameMode] = useState("intermediate");

  const navigate = useNavigate();

  function selectGameMode(e) {
    setSelectedGameMode(e.target.value);
  }

  return (
    <div>
      <Header>
        <ProfileButton />
        <div>Nickname</div>
        <div>Game Mode</div>
        <div>Time</div>
        <div>3BV</div>
        <div>Score</div>
        <select
          name='gameMode'
          id='gameMode'
          defaultValue='intermediate'
          className='text-center'
          onChange={selectGameMode}
        >
          <option value='begginer'>Begginer</option>
          <option value='intermediate'>Intermediate</option>
          <option value='expert'>Expert</option>
        </select>
      </Header>
      {user ? (
        <div>
          <GamesTable gameMode={selectedGameMode} nickname={user.nickname} />
          <div className='container flex items-center'>
            <div className='text-3xl text-bold text-gray-600'>
              Welcome {user.nickname}!
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LargeButton onClick={() => navigate("/login")} text='Log In' />
          <LargeButton onClick={() => navigate("/signup")} text='Sign Up' />
        </div>
      )}
    </div>
  );
}
