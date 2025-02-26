import { useCallback, useEffect, useState } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import { useInterval } from "../hooks/useInterval";

export default function GameWinScreen() {
  const [pos, setPos] = useState(0);
  const { score } = useAdventureContext();
  // const [points, setPoints] = useState(0);

  const handleImageChange = useCallback(() => {
    const newPos = pos + 512;
    setPos(newPos === 1536 ? 0 : newPos);
  }, [pos]);

  useEffect(() => {
    const interval = setInterval(handleImageChange, 300);
    return () => clearInterval(interval);
  }, [handleImageChange]);

  // useInterval(
  //   () => {
  //     const newPoints =
  //       points +
  //       (score > 5000
  //         ? Math.floor(Math.random() * 100 + 1)
  //         : Math.floor(Math.random() * 10 + 1));
  //     if (newPoints > score) {
  //       setPoints(score);
  //     } else setPoints(newPoints);
  //   },
  //   points < score ? 5 : null
  // );

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div
          style={{ ...gameOverStyle, transform: `translateX(-${pos}px)` }}
        ></div>
      </div>
      <div className='text-6xl text-slate-100 translate-y-[-10rem]'>
        {score} points!
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 30,
};

const gameOverStyle = {
  marginTop: 30,
  height: "512px",
  width: "1536px",
  backgroundImage: `url("/game_win.png")`,
  backgroundRepeat: "no-repeat",
};
const containerStyle = {
  height: "512px",
  width: "512px",
  overflow: "hidden",
};
