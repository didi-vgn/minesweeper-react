import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import GamesTable from "../components/GamesTable";
import Header from "../components/Header";
import { useState } from "react";
import ProfileButton from "../components/ProfileButton";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import Achievement from "../components/Achievement";
export default function Profile() {
  const { user } = useAuthContext();
  const [gameMode, setGameMode] = useState("");
  const [sort, setSort] = useState("time");
  const [order, setOrder] = useState("asc");
  const [selectedTab, setSelectedTab] = useState("achievements");

  const navigate = useNavigate();

  function handleFilter(val) {
    setSort(val);
    if (val === sort) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
    }
  }
  return (
    <div>
      <Header>
        <ProfileButton />
      </Header>
      {user ? (
        <div>
          <br />
          <div className='container flex gap-5 items-center p-5'>
            <div className='text-3xl text-bold text-gray-600'>
              Welcome {user.nickname}!
            </div>
            <div
              className='custom-border bg-gray-300 cursor-pointer'
              onClick={() => setSelectedTab("achievements")}
            >
              Achievements
            </div>
            <div
              className='custom-border bg-gray-300 cursor-pointer'
              onClick={() => setSelectedTab("records")}
            >
              Minesweeper Records
            </div>
          </div>
          <br />
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
              {mockAchievements.map((achievement, index) => (
                <Achievement key={index} data={achievement} />
              ))}
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

const mockAchievements = [
  {
    image: "/achievements/pink.png",
    title: "Pink Buddy",
    description: "Play 50 games with the Pink buddy.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/blue.png",
    title: "Blue Buddy",
    description: "Play 50 games with the Blue buddy.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/white.png",
    title: "White Buddy",
    description: "Play 50 games with the White buddy.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/yellow.png",
    title: "Yellow Buddy",
    description: "Play 50 games with the Yellow buddy.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/green.png",
    title: "Green Buddy",
    description: "Play 50 games with the Green buddy.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/team.png",
    title: "Extrovert",
    description: "Play at least one game with each character.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/collector1.png",
    title: "Newbie Collector",
    description: "Collect 50 gems.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/collector2.png",
    title: "Skilled Collector",
    description: "Collect 150 gems.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/collector3.png",
    title: "Expert Collector",
    description: "Collect 200 gems.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/collector4.png",
    title: "Master Collector",
    description: "Collect 500 gems.",
    date: new Date().toString().split(" (")[0],
  },

  {
    image: "/achievements/level1.png",
    title: "Newbie Adventurer",
    description: "Complete 5 levels.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/level2.png",
    title: "Skilled Adventurer",
    description: "Complete 15 levels.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/level3.png",
    title: "Expert Adventurer",
    description: "Complete 30 levels.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/level4.png",
    title: "Master Adventurer",
    description: "Complete 50 levels.",
    date: new Date().toString().split(" (")[0],
  },

  {
    image: "/achievements/scanner1.png",
    title: "Engineer",
    description: "Reveal 10 bombs with the scanner.",
    date: new Date().toString().split(" (")[0],
  },
  {
    image: "/achievements/heart.png",
    title: "Never give up!",
    description: "Stepped on 500 bombs. Oops!",
    date: new Date().toString().split(" (")[0],
  },
];
