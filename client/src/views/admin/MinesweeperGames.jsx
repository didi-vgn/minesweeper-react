import LargeButton from "../../components/LargeButton";
import {
  deleteAllGames,
  getMinesweeperStats,
} from "../../services/baseGameServices";
import errorHandler from "../../utils/errorHandler";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function MinesweeperGames() {
  const { token } = useAuthContext();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMinesweeperStats();
        setStats(data.stats);
        console.log(data.stats);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  async function deleteGames() {
    try {
      await deleteAllGames(token);
      toast.success("All games deleted from database.");
    } catch (err) {
      errorHandler(err);
    }
  }

  return (
    <div className='grid justify-center gap-10 p-10 divide-y mt-20'>
      <div>
        <div className='text-2xl'>
          Total number of games played:{" "}
          {stats?.games[0]._count.id +
            stats?.games[1]._count.id +
            stats?.games[2]._count.id}
        </div>
        <div>Begginer: {stats?.games[0]._count.id}</div>
        <div>Intermediate: {stats?.games[1]._count.id}</div>
        <div>Expert: {stats?.games[2]._count.id}</div>
      </div>
      <div>
        <div className='text-2xl'>
          Most active players: 1.{stats?.topUsers[0].nickname}(
          {stats?.topUsers[0].count} games)
        </div>
        <div>
          2.{stats?.topUsers[1].nickname}({stats?.topUsers[1].count} games)
        </div>
        <div>
          3.{stats?.topUsers[2].nickname}({stats?.topUsers[2].count} games)
        </div>
      </div>
      <div>
        <div className='text-2xl'>Delete all games from the database</div>
        <Button onClick={deleteGames} text='Delete ALL Games' />
      </div>
    </div>
  );
}
