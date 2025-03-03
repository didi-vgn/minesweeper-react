import Play from "../views/Play.jsx";
import Profile from "../views/Profile.jsx";
import Leaderboard from "../views/Leaderboard.jsx";
import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";
import Admin from "../views/Admin.jsx";
import Adventure from "../views/Adventure.jsx";
import ProfileAchievements from "../views/ProfileAchievements.jsx";
import ProfileMinesweeperRecords from "../views/ProfileMinesweeperRecords.jsx";
import ProfileSettings from "../views/ProfileSettings.jsx";
import ProfileMainPage from "../views/ProfileMainPage.jsx";
import ForbiddenPage from "../views/ForbiddenPage.jsx";

const router = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Play />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            index: true,
            path: "/profile",
            element: <ProfileMainPage />,
          },
          {
            index: true,
            path: "/profile/achievements",
            element: <ProfileAchievements />,
          },
          {
            path: "/profile/minesweeper-records",
            element: <ProfileMinesweeperRecords />,
          },
          {
            path: "/profile/settings",
            element: <ProfileSettings />,
          },
          {
            path: "/profile/admin",
            element: <Admin />,
          },
        ],
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "adventure",
        element: <Adventure />,
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
    path: "/forbidden",
    element: <ForbiddenPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
];

export default router;
