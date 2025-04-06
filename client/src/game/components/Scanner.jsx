import { useCallback, useEffect, useState } from "react";
import { other } from "../utils/assets";
import { useAdventureContext } from "../context/AdventureContext";

export default function Scanner({ x, y }) {
  const { event } = useAdventureContext();
  const [frameIndex, setFrameIndex] = useState(0);
  const [active, setActive] = useState(false);

  const handleAnimationChange = useCallback(() => {
    const newIndex = frameIndex + 256;
    if (newIndex >= 1536) {
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
    if (event === "scan" && !active) {
      setActive(true);
    }
  }, [[event, x, y, active]]);

  const spriteStyle = {
    height: "256px",
    width: "1536px",
    backgroundImage: `url(${other.cloud})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  const containerStyle = {
    height: "256px",
    width: "256px",
    overflow: "hidden",
    position: "absolute",
    zIndex: 95,
    transform: `translateX(${x * 64 - 96}px) translateY(${y * 64 - 96}px)`,
  };

  return (
    <div className={!active ? "hidden" : ""} style={containerStyle}>
      <div
        style={{
          ...spriteStyle,
          transform: `translateX(-${frameIndex}px)`,
        }}
      ></div>
    </div>
  );
}
