import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { getGameStats } from "../services/baseGameServices";

export default function GamesTable({ gameMode, nickname = "", sort, order }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await getGameStats(gameMode, nickname, sort, order);
        const gamesData = response.games.map((game) => ({
          ...game,
          board: JSON.parse(game.board),
        }));
        setGames(gamesData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGames();
  }, [gameMode, nickname, sort, order]);

  return (
    <div>
      <div>
        {games.map((game, index) => (
          <TableRow
            key={index}
            nickname={game.userId ? game.user.nickname : "guest"}
            gameMode={game.mode}
            time={game.time}
            bbbv={game.bbbv}
            score={game.points}
            board={game.board}
          ></TableRow>
        ))}
        {games.length === 0 && (
          <div className='bg-gray-100 w-8/10 mx-auto p-20'>
            <div className='text-pink-600 text-2xl text-center'>
              No games yet...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
