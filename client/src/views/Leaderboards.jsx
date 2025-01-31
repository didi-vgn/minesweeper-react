import { useState } from "react";
import GamesTable from "../components/GamesTable";

export default function Leaderboards() {
  //need to work on this later
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
  }
  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        className='w-full p-5 font-medium border rounded-md border-slate-600'
      />
      <GamesTable nickname={query} />;
    </div>
  );
}
