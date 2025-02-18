import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";
import { AdventureProvider } from "./game/context/AdventureContext";
import React from "react";

const MemoizedNav = React.memo(() => (
  <nav className='flex items-center justify-center bg-gray-600 text-gray-50 text-lg font-bold h-20'>
    <ul className='flex gap-20'>
      <CustomNavLink path='/' text='Play' />
      <CustomNavLink path='adventure' text='Adventure' />
      <CustomNavLink path='leaderboards' text='Leaderboards' />
      <CustomNavLink path='profile' text='Profile' />
      <CustomNavLink path='admin' text='Admin' />
    </ul>
  </nav>
));

function App() {
  return (
    <div className='font-mono'>
      <MemoizedNav />
      <div className=''>
        <AuthContextProvider>
          <GameProvider>
            <AdventureProvider>
              <Outlet></Outlet>
            </AdventureProvider>
          </GameProvider>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
