import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";

function App() {
  return (
    <AuthContextProvider>
      <GameProvider>
        <div className='font-mono'>
          <nav className='@container flex items-center justify-center bg-gray-600 text-gray-50 text-lg font-bold h-20'>
            <ul className='flex gap-20'>
              <CustomNavLink path='/' text='Play' />
              <CustomNavLink path='story' text='Story' />
              <CustomNavLink path='leaderboards' text='Leaderboards' />
              <CustomNavLink path='profile' text='Profile' />
              <CustomNavLink path='admin' text='Admin' />
            </ul>
          </nav>
          <div className='flex justify-center items-center w-0.6'>
            <Outlet></Outlet>
          </div>
        </div>
      </GameProvider>
    </AuthContextProvider>
  );
}

export default App;
