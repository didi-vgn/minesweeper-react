import { Outlet, useNavigate } from "react-router-dom";
import LargeButton from "../../components/LargeButton";
import Header from "../../components/Header";
import ProfileButton from "../../components/ProfileButton";
import { useAuthContext } from "../../context/AuthContext";
const BASE_PATH = import.meta.env.BASE_URL;

export default function Profile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      <Header>
        <ProfileButton />
        {user && (
          <div
            onClick={() => navigate(`${BASE_PATH}/profile`)}
            className='cursor-pointer hover:bg-gray-300'
          >
            Achievements
          </div>
        )}
        {user && (
          <div
            onClick={() => navigate("settings")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Settings
          </div>
        )}
        {user?.role === "ADMIN" && (
          <div
            onClick={() => navigate("admin")}
            className='cursor-pointer hover:bg-gray-300'
          >
            Admin Dashboard
          </div>
        )}
      </Header>
      {(!user && (
        <div>
          <br />
          <LargeButton
            onClick={() => navigate(`${BASE_PATH}/login`)}
            text='Log In'
          />
          <br />
          <LargeButton
            onClick={() => navigate(`${BASE_PATH}/signup`)}
            text='Sign Up'
          />
        </div>
      )) || (
        <div className='m-10 mx-auto'>
          <Outlet />
        </div>
      )}
    </div>
  );
}
