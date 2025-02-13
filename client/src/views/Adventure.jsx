import Header from "../components/Header";
import ProfileButton from "../components/ProfileButton";
import { Outlet } from "react-router-dom";

export default function Story() {
  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='flex justify-center'>
        <div className='m-10 p-3 custom-border bg-gray-300 h-[47rem] w-[72rem]'>
          <div className='custom-border-rev h-full bg-gray-100 p-7'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}
