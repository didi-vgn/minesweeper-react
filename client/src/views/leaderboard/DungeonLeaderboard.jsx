import { useState } from "react";
import GamesTable from "../../components/GamesTable";
import { useSearchParams } from "react-router-dom";
import Triangle from "../../components/Triangle";

export default function DungeonLeaderboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nickname = searchParams.get("nickname") || "";
  const [sort, setSort] = useState(searchParams.get("sort") || "points");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  function handleFilter(val) {
    const newOrder = sort === val ? (order === "asc" ? "desc" : "asc") : "asc";
    setSort(val);
    setOrder(newOrder);
    searchParams.set("sort", val);
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <div className='grid grid-cols-3 text-center items-center w-9/10 mx-auto h-15 bg-gray-600 text-slate-100 text-xl'>
        <div>Nickname</div>
        <div
          className='relative cursor-pointer'
          onClick={() => handleFilter("depth")}
        >
          Depth {sort === "depth" && <Triangle order={order} />}
        </div>
        <div
          className='relative cursor-pointer'
          onClick={() => handleFilter("points")}
        >
          Score {sort === "points" && <Triangle order={order} />}
        </div>
      </div>
      <GamesTable
        gameMode='dungeon'
        nickname={nickname}
        sort={sort}
        order={order}
      />
    </div>
  );
}
