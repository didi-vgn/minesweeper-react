import { useState } from "react";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import ProfileButton from "../components/ProfileButton";

export default function Leaderboard() {
  const [query, setQuery] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [sort, setSort] = useState("points");
  const [order, setOrder] = useState("desc");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
  }

  function handleFilter(val) {
    setSort(val);
    if (val === sort) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
  }

  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      <div className='grid grid-cols-[auto_1fr] m-10'>
        <div className='p-5 text-2xl grid grid-cols-1 place-self-start'>
          <input
            type='text'
            value={query}
            onChange={handleChange}
            className='my-5 text-lg border border-slate-600 bg-white'
            placeholder='search user...'
          />
          <div
            className={`h-7 cursor-pointer ${
              gameMode === "" || "begginer" || "intermediate" || "expert"
                ? "border-b-1 border-pink-600"
                : ""
            }`}
            onClick={() => setGameMode("")}
          >
            Classic
          </div>
          <div
            className={`h-7 text-lg text-gray-600 cursor-pointer ${
              gameMode === "begginer" ? "border-b-1 border-pink-600" : ""
            }`}
            onClick={() => setGameMode("begginer")}
          >
            Begginer
          </div>
          <div
            className={`h-7 text-lg text-gray-600 cursor-pointer ${
              gameMode === "intermediate" ? "border-b-1 border-pink-600" : ""
            }`}
            onClick={() => setGameMode("intermediate")}
          >
            Intermediate
          </div>
          <div
            className={`h-7 text-lg text-gray-600 cursor-pointer ${
              gameMode === "expert" ? "border-b-1 border-pink-600" : ""
            }`}
            onClick={() => setGameMode("expert")}
          >
            Expert
          </div>
          <div
            className='h-7 cursor-pointer'
            onClick={() => setGameMode("adventure")}
          >
            Adventure
          </div>
          <div
            className='h-7 cursor-pointer'
            onClick={() => setGameMode("dungeon")}
          >
            Dungeon
          </div>
        </div>
        <div>
          <div className='grid grid-cols-5 text-center items-center w-9/10 mx-auto h-15 bg-gray-600 text-slate-100 text-xl'>
            <div>Nickname</div>
            <div>Difficulty</div>
            <div
              className='relative cursor-pointer'
              onClick={() => handleFilter("time")}
            >
              Time
              {sort === "time" && <Triangle order={order} />}
            </div>
            <div
              className='relative cursor-pointer'
              onClick={() => handleFilter("bbbv")}
            >
              3BV
              {sort === "bbbv" && <Triangle order={order} />}
            </div>
            <div
              className='relative cursor-pointer'
              onClick={() => handleFilter("points")}
            >
              Score
              {sort === "points" && <Triangle order={order} />}
            </div>
          </div>
          <GamesTable
            gameMode={gameMode}
            nickname={query}
            sort={sort}
            order={order}
          />
        </div>
      </div>
    </div>
  );
}

function Triangle({ order }) {
  return (
    <div className='text-slate-400 text-3xl' style={triangleStyle}>
      {order === "asc" && <RxTriangleUp />}
      {order === "desc" && <RxTriangleDown />}
    </div>
  );
}

const triangleStyle = {
  position: "absolute",
  right: 50,
  top: 0,
};
