import Play from "../views/Play.jsx";
import Profile from "../views/Profile.jsx";
import Leaderboards from "../views/Leaderboards.jsx";
import Story from "../views/Story.jsx";
import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";
import Admin from "../views/Admin.jsx";

const router = [
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        element: <Play></Play>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "leaderboards",
        element: <Leaderboards></Leaderboards>,
      },
      {
        path: "story",
        element: <Story></Story>,
      },
      {
        path: "admin",
        element: <Admin></Admin>,
      },
      {
        path: "login",
        element: <LogIn></LogIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
];

export default router;
