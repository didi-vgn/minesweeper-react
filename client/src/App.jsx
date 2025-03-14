import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";
import { AdventureProvider } from "./game/context/AdventureContext";
import React from "react";

function App() {
  return (
    <div className='font-mono'>
      <nav className='flex items-center justify-center bg-gray-600 text-gray-50 text-3xl h-20'>
        <ul className='flex gap-20'>
          <CustomNavLink path='/' text='Play' />
          <CustomNavLink path='leaderboard' text='Leaderboard' />
          <CustomNavLink path='adventure' text='Adventure' />
          <CustomNavLink path='profile' text='Profile' />
        </ul>
      </nav>
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
