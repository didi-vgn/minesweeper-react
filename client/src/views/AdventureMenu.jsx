import LevelIcon from "../game/components/LevelIcon";
import { useAdventureContext } from "../game/context/AdventureContext";
import { useEffect, useState } from "react";
import Settings from "../game/components/Settings";
import { adventureLevels } from "../game/utils/levelsData";
import { useAuthContext } from "../context/AuthContext";
import { getAdvGames } from "../services/getAdvGamesService";
import AdventureApp from "../game/AdventureApp";

export default function AdventureMenu() {
  const { user } = useAuthContext();
  const { newGame } = useAdventureContext();
  const [selectedOption, setSelectedOption] = useState("survival");
  const [progress, setProgress] = useState([]);
  const [currentTab, setCurrentTab] = useState("menu");

  function handleSelectLevel(levelData) {
    newGame(levelData);
    setCurrentTab("play");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAdvGames(user.id);
        if (response.status === 200) {
          setProgress(response.games);
        } else {
          console.error("Failed to fetch progress.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    function fetchLocalData() {
      try {
        const localProgress = JSON.parse(localStorage.getItem("localProgress"));
        if (localProgress) {
          setProgress(localProgress);
        }
      } catch (err) {
        console.error("Failed to read from local storage", err);
      }
    }

    (user && fetchData()) || fetchLocalData();
  }, [user, currentTab]);

  return (
    <div>
      {currentTab === "menu" && (
        <div className='grid grid-cols-[10rem_1fr] h-full'>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col gap-10'>
              <div
                className='bg-gray-300 cursor-pointer'
                onClick={() => setSelectedOption("survival")}
              >
                Level selection
              </div>
              <div
                className='bg-gray-300 cursor-pointer'
                onClick={() => setSelectedOption("settings")}
              >
                Settings
              </div>
              <div
                className='bg-gray-300 cursor-pointer'
                onClick={() => setSelectedOption("info")}
              >
                Info
              </div>
            </div>
            <div>
              <div>
                {progress.reduce((acc, curr) => acc + curr.points, 0)} <br />
                total points
              </div>
              <br />
              <div>
                {progress.reduce((acc, curr) => acc + curr.collectedGems, 0)}/
                {adventureLevels.reduce((acc, curr) => acc + curr.gems, 0)}
                <br /> gems collected
              </div>
            </div>
          </div>
          <div className='custom-border-rev bg-white h-[36rem]'>
            {(selectedOption === "survival" && (
              <div className='grid grid-cols-7 gap-8 m-5'>
                {adventureLevels.map((level, index) => (
                  <LevelIcon
                    key={index + 1}
                    onClick={() => handleSelectLevel(level)}
                    level={level.id}
                    data={progress.find((level) => level.levelId === index + 1)}
                  />
                ))}
              </div>
            )) ||
              (selectedOption === "settings" && <Settings />) ||
              (selectedOption === "info" && (
                <div className='m-10'>
                  Some info about the game <br /> How to play{" "}
                </div>
              ))}
          </div>
        </div>
      )}
      {currentTab === "play" && (
        <AdventureApp
          onClick={() => setCurrentTab("menu")}
          progress={progress}
        />
      )}
    </div>
  );
}
