import { useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";

export default function Stopwatch() {
  const [display, setDisplay] = useState("00:00");
  const stopwatchRef = useRef(0);
  const stopwatchStart = false;

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
    stopwatchStart ? 1000 : null
  );
  return <div>{display}</div>;
}
