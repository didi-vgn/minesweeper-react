import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { getGameScores } from "../services/baseGameServices";
import { useInterval } from "../game/hooks/useInterval";

export default function GamesTable({ gameMode, nickname = "", sort, order }) {
  const [games, setGames] = useState([]);

  async function fetchGames() {
    try {
      const response = await getGameScores(gameMode, nickname, sort, order);
      const gamesData = response.games.map((game) => ({
        ...game,
        board: JSON.parse(game.board),
      }));
      setGames(gamesData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [gameMode, nickname, sort, order]);

  useInterval(fetchGames, 60 * 1000);

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
