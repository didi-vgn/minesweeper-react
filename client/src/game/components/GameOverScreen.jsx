import { useCallback, useEffect, useState } from "react";

export default function GameOverScreen() {
  const [pos, setPos] = useState(0);

  const handleImageChange = useCallback(() => {
    const newPos = pos + 512;
    setPos(newPos === 1536 ? 0 : newPos);
  }, [pos]);

  useEffect(() => {
    const interval = setInterval(handleImageChange, 500);
    return () => clearInterval(interval);
  }, [handleImageChange]);

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <div
          style={{ ...gameOverStyle, transform: `translateX(-${pos}px)` }}
        ></div>
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
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 100,
};

const gameOverStyle = {
  height: "512px",
  width: "1536px",
  backgroundImage: `url("/game_over.png")`,
  backgroundRepeat: "no-repeat",
};
const containerStyle = {
  height: "512px",
  width: "512px",
  overflow: "hidden",
};
