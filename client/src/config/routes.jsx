import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";
import ForbiddenPage from "../views/ForbiddenPage.jsx";
import Profile from "../views/profile/Profile.jsx";
import ProfileAchievements from "../views/profile/ProfileAchievements.jsx";
import ProfileSettings from "../views/profile/ProfileSettings.jsx";
import Admin from "../views/admin/Admin.jsx";
import AccountManagement from "../views/admin/AccounManagement.jsx";
import Achievements from "../views/admin/Achievements.jsx";
import AchievementForm from "../views/admin/AchievementForm.jsx";
import MinesweeperGames from "../views/admin/MinesweeperGames.jsx";
import SettingsNickname from "../views/profile/SettingsNickname.jsx";
import SettingsPassword from "../views/profile/SettingsPassword.jsx";
import SettingsDeleteAccount from "../views/profile/SettingsDeleteAccount.jsx";
import Game from "../views/game/Game.jsx";
import Leaderboard from "../views/leaderboard/Leaderboard.jsx";
import ClassicLeaderboard from "../views/leaderboard/ClassicLeaderboard.jsx";
import AdventureLeaderboard from "../views/leaderboard/AdventureLeaderboard.jsx";
import DungeonLeaderboard from "../views/leaderboard/DungeonLeaderboard.jsx";
const BASE_PATH = import.meta.env.BASE_URL;

const router = [
  {
    path: `${BASE_PATH}`,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Game />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <ProfileAchievements />,
          },
          {
            path: "settings",
            element: <ProfileSettings />,
            children: [
              {
                index: true,
                element: <SettingsPassword />,
              },
              {
                path: "nickname",
                element: <SettingsNickname />,
              },
              {
                path: "delete",
                element: <SettingsDeleteAccount />,
              },
            ],
          },
          {
            path: "admin",
            element: <Admin />,
            children: [
              {
                index: true,
                element: <AccountManagement />,
              },
              {
                path: "achievements",
                element: <Achievements />,
              },
              {
                path: "create-achievement",
                element: <AchievementForm />,
              },
              {
                path: "minesweeper-games",
                element: <MinesweeperGames />,
              },
            ],
          },
        ],
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
        children: [
          { index: true, element: <ClassicLeaderboard /> },
          { path: "adventure", element: <AdventureLeaderboard /> },
          { path: "dungeon", element: <DungeonLeaderboard /> },
        ],
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: `${BASE_PATH}/forbidden`,
    element: <ForbiddenPage />,
  },
  {
    path: `${BASE_PATH}/error`,
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default router;
