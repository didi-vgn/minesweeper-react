import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { getGameStats } from "../services/getGamesService";

export default function GamesTable({ gameMode, nickname = null, sort, order }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await getGameStats(gameMode, nickname, sort, order);
        if (response.status === 200) {
          const gamesData = response.games.map((game) => ({
            ...game,
            board: JSON.parse(game.board),
          }));
          setGames(gamesData);
        } else {
          console.error("failed to fetch games.");
        }
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
          <div className='text-pink-600 text-2xl text-center m-10'>
            No games yet...
          </div>
        )}
      </div>
    </div>
  );
}
