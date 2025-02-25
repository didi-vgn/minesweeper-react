import { useState } from "react";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";

export default function Leaderboards() {
  //need to work on this later
  const [query, setQuery] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [sort, setSort] = useState("time");
  const [order, setOrder] = useState("asc");

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
        <input
          type='text'
          value={query}
          onChange={handleChange}
          className='m-1 font-medium border border-slate-600 bg-white'
        />
        <div
          className='cursor-pointer hover:bg-gray-300'
          onClick={() => setGameMode("begginer")}
        >
          Begginer
        </div>
        <div
          className='cursor-pointer hover:bg-gray-300'
          onClick={() => setGameMode("intermediate")}
        >
          Intermediate
        </div>
        <div
          className='cursor-pointer hover:bg-gray-300'
          onClick={() => setGameMode("expert")}
        >
          Expert
        </div>
        <div
          className='cursor-pointer hover:bg-gray-300'
          onClick={() => setGameMode("")}
        >
          All Games
        </div>
      </Header>
      <br />
      <div className='grid grid-cols-5 text-center items-center w-8/10 m-auto h-15 bg-gray-600 text-slate-100 text-xl'>
        <div>Nickname</div>
        <div>Game Mode</div>
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
