import { Outlet, Link, NavLink } from "react-router-dom";
import "./index.css";

function App() {
  const active = "bg-gray-500 p-5 w-30";
  const inactive = "w-50 p-5";
  return (
    <>
      <nav className='@container flex items-center justify-center bg-gray-600 text-gray-50 text-lg font-bold h-20'>
        <ul className='flex gap-20'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Play
            </NavLink>
          </li>
          <li>
            <NavLink
              to='story'
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to='leaderboards'
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Leaderboards
            </NavLink>
          </li>
          <li>
            <NavLink
              to='profile'
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='admin'
              className={({ isActive }) => (isActive ? active : inactive)}
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='flex justify-center items-center w-0.6'>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
