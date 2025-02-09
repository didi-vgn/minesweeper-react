import Header from "../components/Header";
import ProfileButton from "../components/ProfileButton";
import { AdventureProvider } from "../game/context/AdventureContext";
import { Outlet } from "react-router-dom";

export default function Story() {
  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <AdventureProvider>
        <Outlet></Outlet>
      </AdventureProvider>
    </div>
  );
}
