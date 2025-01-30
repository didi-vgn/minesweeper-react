import { useEffect, useState } from "react";
import Button from "../components/Button";
import Row from "../components/Row";
import { getGameStats } from "../services/getGamesService";

export default function Leaderboards() {
  const [selectedGameMode, setSelectedGameMode] = useState("expert");
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await getGameStats(selectedGameMode);
        if (response.status === 200) {
          setGames(response.games);
        } else {
          console.error("failed to fetch games.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchGames();
  }, [selectedGameMode]);

  return (
    <div className='container'>
      <div className='flex gap-10'>
        <Button
          text='Begginer'
          onClick={() => setSelectedGameMode("begginer")}
        />
        <Button
          text='Intermediate'
          onClick={() => setSelectedGameMode("intermediate")}
        />
        <Button text='Expert' onClick={() => setSelectedGameMode("expert")} />
      </div>

      <div className='m-10'>
        <Row
          nickname='Nickname'
          gameMode='Game Mode'
          time='Time'
          bbbv='3BV'
          score='Score'
        ></Row>
        {games.map((game, index) => (
          <Row
            key={index}
            nickname={game.userId ? game.user.nickname : "guest"}
            gameMode={game.mode}
            time={game.time}
            bbbv={game.bbbv}
            score={game.points}
          ></Row>
        ))}
      </div>
    </div>
  );
}
