import { useAuthContext } from "../context/AuthContext";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  function settingsClick() {
    console.log("Settings");
  }

  function signUpClick() {
    console.log("Sign Up");
  }
  function logInClick() {
    console.log("Log In");
  }

  return (
    <Dropdown
      text={
        user ? (
          <div className='flex items-center gap-1'>
            <div className='text-emerald-600'>
              <PiFinnTheHumanDuotone />
            </div>
            {user.nickname}
          </div>
        ) : (
          <div className='flex items-center gap-1'>
            <div className='text-red-600'>
              <PiFinnTheHumanDuotone />
            </div>
            Not authenticated
          </div>
        )
      }
    >
      {user ? (
        <>
          <div
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            onClick={() => navigate("/account-settings")}
          >
            Settings
          </div>
          <div
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            onClick={logout}
          >
            Log Out
          </div>
        </>
      ) : (
        <>
          <div
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            onClick={() => navigate("/login")}
          >
            Log In
          </div>
          <div
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </div>
        </>
      )}
    </Dropdown>
  );
}
