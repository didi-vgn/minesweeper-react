import CustomNavLink from "../../components/CustomNavLink";
import { Outlet } from "react-router-dom";

export default function ProfileSettings() {
  return (
    <div className='flex items-center justify-center'>
      <div className='custom-border bg-gray-300 h-[45rem] p-2 col-span-3 w-3/5'>
        <div className='custom-border-rev bg-gray-100 h-full p-1'>
          <nav className='bg-gray-600 text-gray-100 text-xl'>
            <ul className='grid grid-cols-3 gap-5'>
              <CustomNavLink path='.' text='Password' end={true} />
              <CustomNavLink path='nickname' text='Nickname' />
              <CustomNavLink path='delete' text='Delete Account' />
            </ul>
          </nav>
          <div className='flex justify-center items-center h-4/5'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
