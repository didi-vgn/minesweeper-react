import Play from "../views/Play.jsx";
import Profile from "../views/Profile.jsx";
import Leaderboards from "../views/Leaderboards.jsx";
import Story from "../views/Story.jsx";
import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";

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
        children: [
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
      {
        path: "leaderboards",
        element: <Leaderboards></Leaderboards>,
      },
      {
        path: "story",
        element: <Story></Story>,
      },
    ],
  },
];

export default router;
