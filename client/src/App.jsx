import { Outlet, Link } from "react-router-dom";

function App() {
  const admin = false;
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Play</Link>
          </li>
          <li>
            <Link to='story'>Story</Link>
          </li>
          <li>
            <Link to='leaderboards'>Leaderboards</Link>
          </li>
          <li>
            <Link to='profile'>Profile</Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default App;
