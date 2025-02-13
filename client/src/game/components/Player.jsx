import { useState, useEffect, useCallback } from "react";
import { useAdventureContext } from "../context/AdventureContext";

const movement = [0, 128];
const explode = [128 * 2, 128 * 3];
const pickUpGolden = [128 * 4, 128 * 5, 128 * 6];
const pickUpGreen = [128 * 7, 128 * 8, 128 * 9];
const pickUpPink = [128 * 10, 128 * 11, 128 * 12];
const pickUpBlue = [128 * 13, 128 * 14, 128 * 15];
const pickUpYellow = [128 * 16, 128 * 17, 128 * 18];
const pickUpWhite = [128 * 19, 128 * 20, 128 * 21];

const sprites = {
  movement,
  explode,
  pickUpGolden,
  pickUpGreen,
  pickUpPink,
  pickUpBlue,
  pickUpYellow,
  pickUpWhite,
};

export default function Player() {
  const [currentSprite, setCurrentSprite] = useState(sprites.movement);
  const [pos, setPos] = useState(currentSprite[0]);
  const { event, playerSprite } = useAdventureContext();

  const spriteStyle = {
    height: "256px",
    width: "2816px",
    backgroundImage: `url(${playerSprite})`,
    backgroundRepeat: "no-repeat",
  };

  const handleSpriteChange = useCallback(() => {
    const newPos = pos + 128;

    if (currentSprite.includes(newPos)) {
      setPos(newPos);
    } else if (currentSprite === sprites.explode) {
      setPos(sprites.explode[0]);
    } else {
      setCurrentSprite(sprites.movement);
      setPos(sprites.movement[0]);
    }
  }, [pos, currentSprite]);

  useEffect(() => {
    const interval = setInterval(handleSpriteChange, 300);
    return () => clearInterval(interval);
  }, [handleSpriteChange]);

  useEffect(() => {
    if (event === "bomb") {
      setCurrentSprite(sprites.explode);
      setPos(sprites.explode[0]);
    } else if (event === "green") {
      setCurrentSprite(sprites.pickUpGreen);
      setPos(sprites.pickUpGreen[0]);
    } else if (event === "pink") {
      setCurrentSprite(sprites.pickUpPink);
      setPos(sprites.pickUpPink[0]);
    } else if (event === "blue") {
      setCurrentSprite(sprites.pickUpBlue);
      setPos(sprites.pickUpBlue[0]);
    } else if (event === "yellow") {
      setCurrentSprite(sprites.pickUpYellow);
      setPos(sprites.pickUpYellow[0]);
    } else if (event === "white") {
      setCurrentSprite(sprites.pickUpWhite);
      setPos(sprites.pickUpWhite[0]);
    } else if (event === "golden") {
      setCurrentSprite(sprites.pickUpGolden);
      setPos(sprites.pickUpGolden[0]);
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

const containerStyle = {
  height: "256px",
  width: "128px",
  overflow: "hidden",
  position: "absolute",
  zIndex: 99,
  transform: "scale(0.5) translateX(-64px) translateY(-384px)",
  objectPosition: "center top",
};
