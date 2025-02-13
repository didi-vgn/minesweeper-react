import { useEffect, useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { useGameContext } from "../context/GameContext";
import { useStatsContext } from "../context/StatsContext";
import { useAdventureContext } from "../context/AdventureContext";
import { mockLevels } from "../utils/mockGameData";

export default function Stopwatch({ isGameActive, resetTrigger }) {
  const { stats, setStats } = useStatsContext();
  const { getTimeTrigger } = useGameContext();
  const { getStatsTrigger, collectedGems, setScore, currentLevel, gameWin } =
    useAdventureContext();
  const [display, setDisplay] = useState("00:00");
  const stopwatchRef = useRef(0);

  useEffect(() => {
    const newStats = { ...stats, time: stopwatchRef.current };
    setStats(newStats);
  }, [getTimeTrigger]);

  useEffect(() => {
    if (gameWin) {
      const calcScore = Math.floor(
        ((collectedGems * 100) / (1 + Math.log(stopwatchRef.current + 1))) *
          ((mockLevels[currentLevel - 1].w + mockLevels[currentLevel - 1].b) /
            20)
      );
      setScore(calcScore);
      mockLevels[currentLevel - 1].completed = true;
      if (collectedGems > mockLevels[currentLevel - 1].gemsCollected) {
        mockLevels[currentLevel - 1].points = calcScore;
        mockLevels[currentLevel - 1].gemsCollected = collectedGems;
      }
    }
  }, [getStatsTrigger]);

  useEffect(() => {
    stopwatchRef.current = 0;
    setDisplay("00:00");
  }, [resetTrigger]);

  useInterval(
    () => {
      stopwatchRef.current++;
      const sec = Math.floor(stopwatchRef.current % 60)
        .toString()
        .padStart(2, "0");
      const min = Math.floor(stopwatchRef.current / 60)
        .toString()
        .padStart(2, "0");

      const stopwatch = `${min}:${sec}`;

      setDisplay(stopwatch);
    },
    isGameActive ? 1000 : null
  );
  return (
    <div className='custom-border-rev bg-white h-full flex justify-center items-center'>
      {display}
    </div>
  );
}
