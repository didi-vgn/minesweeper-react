import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import ProfileButton from "../components/ProfileButton";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import Achievement from "../components/Achievement";
import { getUserAchievements } from "../services/getUserAchievements";

export default function Profile() {
  const { user } = useAuthContext();
  const [gameMode, setGameMode] = useState("");
  const [sort, setSort] = useState("time");
  const [order, setOrder] = useState("asc");
  const [selectedTab, setSelectedTab] = useState("achievements");
  const [achievements, setAchievements] = useState([]);

  const navigate = useNavigate();

  function handleFilter(val) {
    setSort(val);
    if (val === sort) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
  }

  useEffect(() => {
    async function fetchAchievements(userId) {
      try {
        const unlockedAchievements = await getUserAchievements(userId);

        if (unlockedAchievements.length > 0) {
          setAchievements(unlockedAchievements);
        } else {
          console.log("no achievements for this user yet");
        }
      } catch (err) {
        console.error(err);
      }
    }

    user && fetchAchievements(user.id);
  }, [user]);

  return (
    <div>
      <Header>
        <ProfileButton />
        {user && (
          <div onClick={() => setSelectedTab("achievements")}>Achievements</div>
        )}
        {user && (
          <div onClick={() => setSelectedTab("records")}>
            Minesweeper Records
          </div>
        )}
      </Header>
      {user ? (
        <div>
          <div className='text-3xl text-bold text-gray-600 text-center m-5'>
            Welcome {user.nickname}!
          </div>

          {selectedTab === "records" && (
            <div>
              <div className='grid grid-cols-5 text-center items-center w-8/10 m-auto h-15 bg-gray-600 text-slate-100 text-xl'>
                <div>Nickname</div>
                <div>Game Mode</div>
                <div
                  className='relative cursor-pointer'
                  onClick={() => handleFilter("time")}
                >
                  Time
                  {sort === "time" && <Triangle order={order} />}
                </div>
                <div
                  className='relative cursor-pointer'
                  onClick={() => handleFilter("bbbv")}
                >
                  3BV
                  {sort === "bbbv" && <Triangle order={order} />}
                </div>
                <div
                  className='relative cursor-pointer'
                  onClick={() => handleFilter("points")}
                >
                  Score
                  {sort === "points" && <Triangle order={order} />}
                </div>
              </div>
              <GamesTable
                gameMode={gameMode}
                nickname={user.nickname}
                sort={sort}
                order={order}
              />
            </div>
          )}
          {selectedTab === "achievements" && (
            <div className='flex gap-5 flex-wrap w-8/10 m-auto'>
              {achievements.map((a, i) => {
                if (
                  a.achievementId.substring(0, a.achievementId.length - 1) ===
                  achievements[i + 1]?.achievementId.substring(
                    0,
                    a.achievementId.length - 1
                  )
                ) {
                  return;
                } else {
                  return <Achievement key={a.achievementId} data={a} />;
                }
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <LargeButton onClick={() => navigate("/login")} text='Log In' />
          <LargeButton onClick={() => navigate("/signup")} text='Sign Up' />
        </div>
      )}
    </div>
  );
}

function Triangle({ order }) {
  return (
    <div className='text-slate-400 text-3xl' style={triangleStyle}>
      {order === "asc" && <RxTriangleUp />}
      {order === "desc" && <RxTriangleDown />}
    </div>
  );
}

const triangleStyle = {
  position: "absolute",
  right: 50,
  top: 0,
};
