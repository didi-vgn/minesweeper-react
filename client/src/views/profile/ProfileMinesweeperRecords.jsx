import { useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import GamesTable from "../../components/GamesTable";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileMinesweeperRecords() {
  const { user } = useAuthContext();
  const [gameMode, setGameMode] = useState("");
  const [sort, setSort] = useState("points");
  const [order, setOrder] = useState("desc");

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
        nickname={user.nickname}
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
