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
          {(stats?.games[0]?._count.id || 0) +
            (stats?.games[1]?._count.id || 0) +
            (stats?.games[2]?._count.id || 0)}
        </div>
        <div>Beginner: {stats?.games[0]?._count.id || 0}</div>
        <div>Intermediate: {stats?.games[1]?._count.id || 0}</div>
        <div>Expert: {stats?.games[2]?._count.id || 0}</div>
      </div>
      <div>
        <div className='text-2xl'>Most active players:</div>
        {stats?.topUsers?.map((u, i) => (
          <div key={i}>{`${i + 1}. ${u.nickname} (${u.count} games)`}</div>
        ))}
      </div>
      <div>
        <div className='text-2xl'>Delete all games from the database</div>
        <Button onClick={deleteGames} text='Delete ALL Games' />
      </div>
    </div>
  );
}
