import { useCallback, useEffect, useState } from "react";
import { smoke } from "../utils/assets";
import { useAdventureContext } from "../context/AdventureContext";

export default function Scanner({ x, y }) {
  const { event } = useAdventureContext();
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: null, y: null });

  const handleAnimationChange = useCallback(() => {
    const newPos = pos + 256;
    if (pos >= 2304) {
      setActive(false);
      setPos(0);
      setInitialPos({ x: null, y: null });
    } else {
      setPos(newPos);
    }
  });

  useEffect(() => {
    if (active) {
      const interval = setInterval(handleAnimationChange, 80);
      return () => clearInterval(interval);
    }
  }, [active, handleAnimationChange]);

  useEffect(() => {
    if (event === "scan" && !active) {
      setActive(true);
      setInitialPos({ x, y });
    }
  }, [[event, x, y, active]]);

  const spriteStyle = {
    height: "256px",
    width: "2560px",
    backgroundImage: `url(${smoke})`,
    backgroundRepeat: "no-repeat",
  };

  const containerStyle = {
    height: "256px",
    width: "256px",
    overflow: "hidden",
    position: "absolute",
    zIndex: 85,
    transform: `translateX(${x * 64 - 96}px) translateY(${y * 64 - 96}px)`,
  };

  return (
    <div style={containerStyle}>
      {true && (
        <div
          style={{
            ...spriteStyle,
            transform: `translateX(-${pos}px)`,
          }}
        ></div>
      )}
    </div>
  );
}
