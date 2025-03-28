import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import CustomNavLink from "../../components/CustomNavLink";

export default function Admin() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user.role !== "ADMIN") {
  //     navigate("/forbidden");
  //   }
  // }, [user]);

  return (
    <div className='flex items-center justify-center'>
      <div className='custom-border bg-gray-300 h-[45rem] p-2 col-span-3 w-3/5'>
        <div className='custom-border-rev bg-gray-100 h-full p-1 overflow-scroll overflow-x-hidden'>
          <nav className='bg-gray-600 text-gray-100 text-xl'>
            <ul className='grid grid-cols-4 gap-5'>
              <CustomNavLink path='.' text='Account Management' end={true} />
              <CustomNavLink path='achievements' text='Achievements' />
              <CustomNavLink
                path='create-achievement'
                text='Create Achievement'
              />
              <CustomNavLink
                path='minesweeper-games'
                text='Minesweeper Games'
              />
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
