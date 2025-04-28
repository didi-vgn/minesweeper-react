import { Outlet } from "react-router-dom";
import "./index.css";
import CustomNavLink from "./components/CustomNavLink";
import AuthContextProvider from "./context/AuthContext";
import { GameProvider } from "./game/context/GameContext";
import { AdventureProvider } from "./game/context/AdventureContext";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='font-mono'>
      <nav className='bg-gray-600 text-gray-100 text-3xl h-15'>
        <ul className='grid grid-cols-4 gap-10 w-4/5 mx-auto h-full'>
          <CustomNavLink path='leaderboard' text='Leaderboard' />
          <CustomNavLink path='/' text='Play' />
          <CustomNavLink path='profile' text='Profile' />
          <CustomNavLink path='credits' text='Credits' />
        </ul>
      </nav>
      <div>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Slide}
        />
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
