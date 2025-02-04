import { useState } from "react";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";

export default function Leaderboards() {
  //need to work on this later
  const [query, setQuery] = useState("");
  const [selectedGameMode, setSelectedGameMode] = useState("intermediate");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
  }

  function selectGameMode(e) {
    setSelectedGameMode(e.target.value);
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
        <div>Nickname</div>
        <div>Game Mode</div>
        <div>Time</div>
        <div>3BV</div>
        <div>Score</div>
        <select
          name='gameMode'
          id='gameMode'
          defaultValue='intermediate'
          onChange={selectGameMode}
          className='relative text-gray-600 text-center m-1 gap-2 focus:none'
        >
          <option
            value='begginer'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Begginer
          </option>
          <option
            value='intermediate'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Intermediate
          </option>
          <option
            value='expert'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Expert
          </option>
        </select>
      </Header>
      <GamesTable gameMode={selectedGameMode} nickname={query} />
    </div>
  );
}
