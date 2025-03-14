import { useState, useEffect, useCallback } from "react";
import { useAdventureContext } from "../context/AdventureContext";
import { animation } from "../utils/assets";

export default function Player() {
  const [currentSprite, setCurrentSprite] = useState(animation.movement);
  const [pos, setPos] = useState(currentSprite[0]);
  const { event, playerSprite } = useAdventureContext();

  const spriteStyle = {
    height: "256px",
    width: "3200px",
    backgroundImage: `url(${playerSprite})`,
    backgroundRepeat: "no-repeat",
  };

  const containerStyle = {
    height: "256px",
    width: "128px",
    overflow: "hidden",
    position: "absolute",
    zIndex: 99,

    transform: "scale(0.5) translateX(-64px) translateY(-384px)",
  };

  const handleSpriteChange = useCallback(() => {
    const newPos = pos + 128;

    if (currentSprite.includes(newPos)) {
      setPos(newPos);
    } else if (currentSprite === animation.explode) {
      setPos(animation.explode[0]);
    } else {
      setCurrentSprite(animation.movement);
      setPos(animation.movement[0]);
    }
  }, [pos, currentSprite]);

  useEffect(() => {
    const interval = setInterval(handleSpriteChange, 300);
    return () => clearInterval(interval);
  }, [handleSpriteChange]);

  useEffect(() => {
    if (event === "normal") {
      setCurrentSprite(animation.movement);
      setPos(animation.movement[0]);
    } else if (event === "bomb") {
      setCurrentSprite(animation.explode);
      setPos(animation.explode[0]);
    } else if (event === "green") {
      setCurrentSprite(animation.pickUpGreen);
      setPos(animation.pickUpGreen[0]);
    } else if (event === "pink") {
      setCurrentSprite(animation.pickUpPink);
      setPos(animation.pickUpPink[0]);
    } else if (event === "blue") {
      setCurrentSprite(animation.pickUpBlue);
      setPos(animation.pickUpBlue[0]);
    } else if (event === "yellow") {
      setCurrentSprite(animation.pickUpYellow);
      setPos(animation.pickUpYellow[0]);
    } else if (event === "white") {
      setCurrentSprite(animation.pickUpWhite);
      setPos(animation.pickUpWhite[0]);
    } else if (event === "golden") {
      setCurrentSprite(animation.pickUpGolden);
      setPos(animation.pickUpGolden[0]);
    } else if (event === "scanner") {
      setCurrentSprite(animation.pickUpScanner);
      setPos(animation.pickUpScanner[0]);
    }
  }, [event]);

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...spriteStyle,
          transform: `translateX(-${pos}px)`,
        }}
      />
    </div>
  );
}
