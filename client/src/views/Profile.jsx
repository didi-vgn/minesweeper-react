import { Outlet, Link } from "react-router-dom";

export default function Profile() {
  const connected = false;
  const nickname = "didi";
  return (
    <div>
      <h3>Profile</h3>

      <div>
        {connected ? (
          <div>
            <div className='profilePicture'></div>
            <div>Welcome {nickname}!!</div>
            <button>Log out</button>
          </div>
        ) : (
          <div>
            <button>
              <Link to='/profile/login'>Log in</Link>
            </button>
            <button>
              <Link to='/profile/signup'>Sign up</Link>
            </button>
            <Outlet></Outlet>
          </div>
        )}
      </div>
    </div>
  );
}
