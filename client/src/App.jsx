import { Outlet, Link, NavLink } from "react-router-dom";

function App() {
  const admin = false;
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Play
            </NavLink>
          </li>
          <li>
            <NavLink
              to='story'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to='leaderboards'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Leaderboards
            </NavLink>
          </li>
          <li>
            <NavLink
              to='profile'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='admin'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default App;
