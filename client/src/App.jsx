import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";
import { StatsProvider } from "./game/context/StatsContext";

function App() {
  return (
    <AuthContextProvider>
      <StatsProvider>
        <GameProvider>
          <div className='font-mono'>
            <nav className='flex items-center justify-center bg-gray-600 text-gray-50 text-lg font-bold h-20'>
              <ul className='flex gap-20'>
                <CustomNavLink path='/' text='Play' />
                <CustomNavLink path='story' text='Story' />
                <CustomNavLink path='leaderboards' text='Leaderboards' />
                <CustomNavLink path='profile' text='Profile' />
                <CustomNavLink path='admin' text='Admin' />
              </ul>
            </nav>
            <div className=''>
              <Outlet></Outlet>
            </div>
          </div>
        </GameProvider>
      </StatsProvider>
    </AuthContextProvider>
  );
}

export default App;
