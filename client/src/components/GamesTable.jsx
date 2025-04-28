import { useEffect, useState } from "react";
import { getClassicGameScores } from "../services/baseGameServices";
import {
  getAdvLeaderboard,
  getDunLeaderboard,
} from "../services/adventureGamesServices";
import { adventureLevels } from "../game/utils/levelsData";
import errorHandler from "../utils/errorHandler";
import ScoreGameBoard from "./ScoreGameBoard";

export default function GamesTable({ gameMode, nickname = "", sort, order }) {
  const [games, setGames] = useState([]);

  async function fetchClassicGames() {
    try {
      const response = await getClassicGameScores(
        gameMode,
        nickname,
        sort,
        order
      );
      const gamesData = response.games.map((game) => ({
        ...game,
        board: JSON.parse(game.board),
      }));
      setGames(gamesData);
    } catch (err) {
      errorHandler(err);
    }
  }

  async function fetchAdvGames() {
    try {
      const response = await getAdvLeaderboard(nickname, sort, order);
      setGames(response.leaderboard);
    } catch (err) {
      errorHandler(err);
    }
  }

  async function fetchDunGames() {
    try {
      const response = await getDunLeaderboard(nickname, sort, order);
      setGames(response.leaderboard);
    } catch (err) {
      errorHandler(err);
    }
  }

  useEffect(() => {
    if (gameMode === "adventure") {
      fetchAdvGames();
    } else if (gameMode === "dungeon") {
      fetchDunGames();
    } else {
      fetchClassicGames();
    }
  }, [gameMode, nickname, sort, order]);

  return (
    <div>
      <div>
        {games.length === 0 ? (
          <div className='bg-gray-100 w-9/10 mx-auto p-20'>
            <div className='text-pink-600 text-2xl text-center'>
              No games yet...
            </div>
          </div>
        ) : gameMode === "adventure" ? (
          games.map((game, index) => <AdvRow key={index} game={game} />)
        ) : gameMode === "dungeon" ? (
          games.map((game, index) => <DunRow key={index} game={game} />)
        ) : (
          games.map((game, index) => <ClassicRow key={index} game={game} />)
        )}
      </div>
    </div>
  );
}

function ClassicRow({ game }) {
  const [expand, setExpand] = useState(false);
  function expandGame() {
    setExpand(!expand);
  }
  return (
    <>
      <div
        className={`cursor-pointer grid grid-cols-5 items-center ${
          expand ? "bg-gray-400" : "bg-gray-300"
        } w-9/10 m-auto h-10 text-center hover:bg-gray-400 border border-stone-100`}
        onClick={expandGame}
      >
        <div>{game.user?.nickname || "guest"}</div>
        <div>{game.difficulty}</div>
        <div>{game.time}</div>
        <div>{game.bbbv}</div>
        <div>{game.points}</div>
      </div>
      {expand && (
        <div className='bg-gray-100 w-9/10 m-auto flex justify-around items-center gap-10'>
          <div className='flex flex-col gap-5'>
            <div>Time: {game.time}</div>
            <div>3BV: {game.bbbv}</div>
            <div>Score: {game.points}</div>
            <div>Played on: {game.playedOn.split("T")[0]}</div>
          </div>
          <ScoreGameBoard board={game.board} />
        </div>
      )}
    </>
  );
}

function AdvRow({ game }) {
  return (
    <div
      className={`grid grid-cols-3 items-center w-9/10 m-auto h-10 text-center bg-gray-300 border border-stone-100`}
    >
      <div>{game.nickname}</div>
      <div>{Math.round((game.progress * 100) / adventureLevels.length)}%</div>
      <div>{game.points}</div>
    </div>
  );
}

function DunRow({ game }) {
  return (
    <div
      className={`grid grid-cols-3 items-center w-9/10 m-auto h-10 text-center bg-gray-300 border border-stone-100`}
    >
      <div>{game.user?.nickname || "guest"}</div>
      <div>{game.depth}</div>
      <div>{game.points}</div>
    </div>
  );
}
