import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";
import { StatsProvider } from "./game/context/StatsContext";
import { AdventureProvider } from "./game/context/AdventureContext";

function App() {
  return (
    <AuthContextProvider>
      <StatsProvider>
        <GameProvider>
          <AdventureProvider>
            <div className='font-mono'>
              <nav className='flex items-center justify-center bg-gray-600 text-gray-50 text-lg font-bold h-20'>
                <ul className='flex gap-20'>
                  <CustomNavLink path='/' text='Play' />
                  <CustomNavLink path='adventure' text='Adventure' />
                  <CustomNavLink path='leaderboards' text='Leaderboards' />
                  <CustomNavLink path='profile' text='Profile' />
                  <CustomNavLink path='admin' text='Admin' />
                </ul>
              </nav>
              <div className=''>
                <Outlet></Outlet>
              </div>
            </div>
          </AdventureProvider>
        </GameProvider>
      </StatsProvider>
    </AuthContextProvider>
  );
}

export default App;
