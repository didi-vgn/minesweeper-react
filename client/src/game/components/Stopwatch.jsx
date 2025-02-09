import { useEffect, useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { useGameContext } from "../context/GameContext";
import { useStatsContext } from "../context/StatsContext";

export default function Stopwatch({ isGameActive, resetTrigger }) {
  const { stats, setStats } = useStatsContext();
  const { getTimeTrigger } = useGameContext();
  const [display, setDisplay] = useState("00:00");
  const stopwatchRef = useRef(0);

  useEffect(() => {
    const newStats = { ...stats, time: stopwatchRef.current };
    setStats(newStats);
  }, [getTimeTrigger]);

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
  return <div className='custom-border-rev bg-white'>{display}</div>;
}
