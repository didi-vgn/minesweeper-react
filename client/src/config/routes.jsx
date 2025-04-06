import Leaderboard from "../views/Leaderboard.jsx";
import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";
import ForbiddenPage from "../views/ForbiddenPage.jsx";
import Profile from "../views/profile/Profile.jsx";
import ProfileAchievements from "../views/profile/ProfileAchievements.jsx";
import ProfileMinesweeperRecords from "../views/profile/ProfileMinesweeperRecords.jsx";
import ProfileSettings from "../views/profile/ProfileSettings.jsx";
import Admin from "../views/admin/Admin.jsx";
import AccountManagement from "../views/admin/AccounManagement.jsx";
import Achievements from "../views/admin/Achievements.jsx";
import AchievementForm from "../views/admin/AchievementForm.jsx";
import MinesweeperGames from "../views/admin/MinesweeperGames.jsx";
import SettingsNickname from "../views/profile/SettingsNickname.jsx";
import SettingsPassword from "../views/profile/SettingsPassword.jsx";
import SettingsDeleteAccount from "../views/profile/SettingsDeleteAccount.jsx";
import Sandbox from "../views/Sandbox.jsx";
import Game from "../views/game/Game.jsx";

const router = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
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
            path: "minesweeper-records",
            element: <ProfileMinesweeperRecords />,
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
      },

      { path: "sandbox", element: <Sandbox /> },
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
    path: "/forbidden",
    element: <ForbiddenPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
];

export default router;
