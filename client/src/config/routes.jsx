import Play from "../views/Play.jsx";
import Profile from "../views/Profile.jsx";
import Leaderboards from "../views/Leaderboards.jsx";
import LogIn from "../views/LogIn.jsx";
import SignUp from "../views/SignUp.jsx";
import ErrorPage from "../views/ErrorPage.jsx";
import App from "../App.jsx";
import Admin from "../views/Admin.jsx";
import Adventure from "../views/Adventure.jsx";

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
      },
      {
        path: "leaderboards",
        element: <Leaderboards />,
      },
      {
        path: "adventure",
        element: <Adventure />,
      },
      {
        path: "admin",
        element: <Admin />,
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
];

export default router;
