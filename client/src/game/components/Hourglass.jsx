import { useCallback, useEffect, useState } from "react";
import { other } from "../utils/assets";
import { useAdventureContext } from "../context/AdventureContext";

export default function Hourglass({ x, y }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [active, setActive] = useState(false);
  const { event } = useAdventureContext();

  const handleAnimationChange = useCallback(() => {
    const newIndex = frameIndex + 64;
    if (newIndex >= 384) {
      setActive(false);
      setFrameIndex(0);
    } else {
      setFrameIndex(newIndex);
    }
  });

  useEffect(() => {
    if (active) {
      const interval = setInterval(handleAnimationChange, 100);
      return () => clearInterval(interval);
    }
  }, [active, handleAnimationChange]);

  useEffect(() => {
    if (event === "extraTime" && !active) {
      setActive(true);
    }
  }, [active, event]);

  const spriteStyle = {
    height: "64px",
    width: "384px",
    backgroundImage: `url(${other.hourglass})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  const containerStyle = {
    height: "64px",
    width: "64px",
    overflow: "hidden",
    position: "absolute",
    zIndex: 95,
    transform: `translateX(${x * 64}px) translateY(${y * 64}px)`,
  };

  return (
    <div className={`${!active ? "hidden" : ""}`} style={containerStyle}>
      <div
        style={{
          ...spriteStyle,
          transform: `translateX(-${frameIndex}px)`,
        }}
      ></div>
    </div>
  );
}
