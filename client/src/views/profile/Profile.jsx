import { Outlet, useNavigate } from "react-router-dom";
import LargeButton from "../../components/LargeButton";
import Header from "../../components/Header";
import ProfileButton from "../../components/ProfileButton";
import { useAuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      <Header>
        <ProfileButton />
        {user && (
          <div
            onClick={() => navigate("/profile")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Achievements
          </div>
        )}
        {user && (
          <div
            onClick={() => navigate("/profile/minesweeper-records")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Minesweeper Records
          </div>
        )}
        {user && (
          <div
            onClick={() => navigate("/profile/settings")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Settings
          </div>
        )}
        {user && (
          <div
            onClick={() => navigate("/profile/admin")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Admin
          </div>
        )}
      </Header>
      {(!user && (
        <div>
          <br />
          <LargeButton onClick={() => navigate("/login")} text='Log In' />
          <br />
          <LargeButton onClick={() => navigate("/signup")} text='Sign Up' />
        </div>
      )) || (
        <div className='m-10 mx-auto'>
          <Outlet />
        </div>
      )}
    </div>
  );
}
