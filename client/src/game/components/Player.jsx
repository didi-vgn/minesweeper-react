import { useState, useEffect, useCallback } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import { animation } from "../utils/assets";
import Scanner from "./Scanner";

export default function Player({ helper }) {
  const [currentAnimation, setCurrentAnimation] = useState(animation.movement);
  const [frameIndex, setFrameIndex] = useState(currentAnimation[0]);
  const { event, preferences } = useAdventureContext();

  const spriteStyle = {
    height: "256px",
    width: "3200px",
    backgroundImage: `url(${preferences.playerSkin})`,
    backgroundRepeat: "no-repeat",
  };

  const handleSpriteChange = useCallback(() => {
    const newFrameIndex = frameIndex + 128;
    if (currentAnimation.includes(newFrameIndex)) {
      setFrameIndex(newFrameIndex);
    } else if (currentAnimation === animation.explode) {
      setFrameIndex(animation.explode[0]);
    } else {
      setCurrentAnimation(animation.movement);
      setFrameIndex(animation.movement[0]);
    }
  }, [frameIndex, currentAnimation]);

  useEffect(() => {
    const interval = setInterval(handleSpriteChange, 300);
    return () => clearInterval(interval);
  }, [handleSpriteChange]);

  useEffect(() => {
    if (event === "base") {
      setCurrentAnimation(animation.movement);
      setFrameIndex(animation.movement[0]);
    } else if (event === "bomb") {
      setCurrentAnimation(animation.explode);
      setFrameIndex(animation.explode[0]);
    } else if (event === "green") {
      setCurrentAnimation(animation.pickUpGreen);
      setFrameIndex(animation.pickUpGreen[0]);
    } else if (event === "pink") {
      setCurrentAnimation(animation.pickUpPink);
      setFrameIndex(animation.pickUpPink[0]);
    } else if (event === "blue") {
      setCurrentAnimation(animation.pickUpBlue);
      setFrameIndex(animation.pickUpBlue[0]);
    } else if (event === "yellow") {
      setCurrentAnimation(animation.pickUpYellow);
      setFrameIndex(animation.pickUpYellow[0]);
    } else if (event === "white") {
      setCurrentAnimation(animation.pickUpWhite);
      setFrameIndex(animation.pickUpWhite[0]);
    } else if (event === "golden") {
      setCurrentAnimation(animation.pickUpGolden);
      setFrameIndex(animation.pickUpGolden[0]);
    } else if (event === "scanner") {
      setCurrentAnimation(animation.pickUpScanner);
      setFrameIndex(animation.pickUpScanner[0]);
    }
  }, [event]);

  return (
    <div className='relative'>
      <div
        className={`absolute -top-27 -left-6 z-90 w-max text-center animate-bounce text-2xl bg-white border ${
          helper === "" && "hidden"
        }`}
      >
        {helper}
      </div>
      <div className='w-[128px] h-[256px] overflow-hidden absolute z-94  bottom-0 left-0 origin-bottom-left scale-50'>
        <div
          style={{
            ...spriteStyle,
            transform: `translateX(-${frameIndex}px)`,
          }}
        />
      </div>
    </div>
  );
}
