import LevelIcon from "../game/components/LevelIcon";
import { useNavigate } from "react-router-dom";
import { useAdventureContext } from "../game/context/AdventureContext";
import { useEffect, useState } from "react";
import Settings from "../game/components/Settings";
import { mockLevels } from "../game/utils/mockGameData";

export default function LevelSelection() {
  const { newGame, getStatsTrigger } = useAdventureContext();
  const [selectedOption, setSelectedOption] = useState("survival");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalGems, setTotalGems] = useState(0);

  const navigate = useNavigate();

  function handleSelectLevel(levelData) {
    newGame(levelData);
    navigate("/adventure/play");
  }

  useEffect(() => {
    function calcStats() {
      setTotalPoints(mockLevels.reduce((acc, curr) => acc + curr.points, 0));
      setTotalGems(
        mockLevels.reduce((acc, curr) => acc + curr.gemsCollected, 0)
      );
    }
    calcStats();
  }, [getStatsTrigger]);

  return (
    <div className='grid grid-cols-[10rem_1fr] h-full'>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-10'>
          <div
            className='bg-gray-300'
            onClick={() => setSelectedOption("survival")}
          >
            Level selection
          </div>
          <div
            className='bg-gray-300'
            onClick={() => setSelectedOption("settings")}
          >
            Settings
          </div>
        </div>
        <div>
          <div>
            {totalPoints} <br />
            total points
          </div>
          <br />
          <div>
            {totalGems}/{mockLevels.reduce((acc, curr) => acc + curr.g, 0)}{" "}
            <br /> gems collected
          </div>
        </div>
      </div>
      <div className='custom-border-rev bg-white'>
        {(selectedOption === "survival" && (
          <div className='grid grid-cols-5 gap-10 m-5'>
            {mockLevels.map((level, index) => (
              <LevelIcon
                key={index + 1}
                onClick={() => handleSelectLevel(level)}
                level={level.id}
                icon={level.icon}
                completed={level.completed}
              />
            ))}
          </div>
        )) ||
          (selectedOption === "settings" && <Settings />)}
      </div>
    </div>
  );
}
