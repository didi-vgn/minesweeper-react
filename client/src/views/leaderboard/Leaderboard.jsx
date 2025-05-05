import Header from "../../components/Header";
import ProfileButton from "../../components/ProfileButton";
import { createSearchParams, Outlet } from "react-router-dom";
import { NavLink, useSearchParams } from "react-router-dom";
const BASE_PATH = import.meta.env.BASE_URL;

export default function Leaderboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("nickname") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    searchParams.set("nickname", value);
    setSearchParams(searchParams);
  };

  const difficulties = ["beginner", "intermediate", "expert"];

  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='grid grid-cols-[auto_1fr] m-10 gap-10'>
        <nav className='flex flex-col text-2xl'>
          <input
            type='text'
            value={query}
            onChange={handleChange}
            className='text-lg border border-slate-600 bg-white my-5'
            placeholder='search user...'
          />

          <NavLink
            to={`${BASE_PATH}/leaderboard`}
            end={true}
            className={({ isActive }) =>
              `${
                isActive ? "border-b-1 border-pink-600" : ""
              } h-7 cursor-pointer`
            }
          >
            Classic
          </NavLink>
          <div className='ml-5 text-base'>
            {difficulties.map((d) => {
              const isSelected = searchParams.get("difficulty") === d;
              return (
                <NavLink
                  key={d}
                  to={{
                    pathname: `${BASE_PATH}/leaderboard`,
                    search: createSearchParams({
                      difficulty: d,
                      nickname: query,
                    }).toString(),
                  }}
                  className='block cursor-pointer'
                >
                  <span>
                    {isSelected ? "> " : ""}
                    {d[0].toUpperCase() + d.slice(1)}
                  </span>
                </NavLink>
              );
            })}
          </div>
          <NavLink
            to='adventure'
            className={({ isActive }) =>
              `${
                isActive ? "border-b-1 border-pink-600" : ""
              } h-7 cursor-pointer`
            }
          >
            Adventure
          </NavLink>
          <NavLink
            to='dungeon'
            className={({ isActive }) =>
              `${
                isActive ? "border-b-1 border-pink-600" : ""
              } h-7 cursor-pointer`
            }
          >
            Dungeon
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
