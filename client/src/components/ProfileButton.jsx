import { useAuthContext } from "../context/AuthContext";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
const BASE_PATH = import.meta.env.BASE_URL;

export default function ProfileButton() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Dropdown
      text={
        <div className='flex items-center gap-1'>
          <div className={`${user ? "text-emerald-600" : "text-red-600"}`}>
            <PiFinnTheHumanDuotone />
          </div>
          {user?.nickname || "guest"}
        </div>
      }
    >
      {user ? (
        <>
          <div
            className='block px-4 py-2 text-sm hover:bg-gray-100'
            onClick={() => navigate(`${BASE_PATH}/profile/settings`)}
          >
            Settings
          </div>
          <div
            className='block px-4 py-2 text-sm hover:bg-gray-100'
            onClick={logout}
          >
            Log Out
          </div>
        </>
      ) : (
        <>
          <div
            className='block px-4 py-2 text-sm hover:bg-gray-100'
            onClick={() => navigate(`${BASE_PATH}/login`)}
          >
            Log In
          </div>
          <div
            className='block px-4 py-2 text-sm hover:bg-gray-100'
            onClick={() => navigate(`${BASE_PATH}/signup`)}
          >
            Sign Up
          </div>
        </>
      )}
    </Dropdown>
  );
}
