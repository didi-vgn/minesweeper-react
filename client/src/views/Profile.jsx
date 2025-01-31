import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import GamesTable from "../components/GamesTable";

export default function Profile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      {user ? (
        <div>
          <div className='container flex items-center'>
            <div className='text-3xl text-bold text-gray-600'>
              Welcome {user.nickname}!
            </div>
            <LargeButton onClick={logout} text='Log Out' />
          </div>
          <GamesTable nickname={user.nickname} />
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
