import { useEffect, useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";

export default function Stopwatch({ isGameActive, resetTrigger }) {
  const [display, setDisplay] = useState("00:00");
  const stopwatchRef = useRef(0);

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
  return <div>{display}</div>;
}
