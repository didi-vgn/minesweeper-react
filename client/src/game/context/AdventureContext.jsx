import { createContext, useContext, useState } from "react";
import { generateStoryBoard } from "../logic/generateStoryBoard";
import { leftClick } from "../logic/click";
import { mapSkins, playerSprites } from "../utils/assets";

const AdventureContext = createContext(null);

export function useAdventureContext() {
  return useContext(AdventureContext);
}

const randomProp = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

export function AdventureProvider({ children }) {
  const [board, setBoard] = useState([]);
  const [collectedGems, setCollectedGems] = useState(0);
  const [event, setEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [settings, setSettings] = useState({
    character: "random",
    map: "random",
  });
  const [mapSkin, setMapSkin] = useState(null);
  const [playerSprite, setPlayerSprite] = useState(null);
  const [gameWin, setGameWin] = useState(false);
  const [getStatsTrigger, setGetStatsTrigger] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(null);

  function newGame(levelData) {
    setGameOver(false);
    setCollectedGems(0);
    const newBoard = generateStoryBoard(
      levelData.w,
      9,
      levelData.b,
      levelData.g
    );
    setBoard(newBoard);
    setIsGameActive(true);
    setGameWin(false);
    setCurrentLevel(levelData.id);

    if (settings.character === "random") {
      setPlayerSprite(randomProp(playerSprites));
    } else setPlayerSprite(playerSprites[settings.character]);
    if (settings.map === "random") {
      setMapSkin(randomProp(mapSkins));
    } else setMapSkin(mapSkins[settings.map]);
  }

  function triggerEvent(eventType) {
    setEvent(eventType);
    setTimeout(() => setEvent(null), 100);
  }

  function movePlayer(i, j) {
    const newBoard = leftClick(board, i, j);

    if (newBoard[i][j].gem.color !== "" && !newBoard[i][j].gem.collected) {
      newBoard[i][j] = {
        ...newBoard[i][j],
        gem: { ...newBoard[i][j].gem, collected: true },
      };

      triggerEvent(newBoard[i][j].gem.color);
      setCollectedGems((prev) => prev + 1);
    }

    if (newBoard[i][j].value === -1) {
      triggerEvent("bomb");
      setGameOver(true);
      setIsGameActive(false);
    }

    if (newBoard[i][j].gem.color === "golden") {
      setGameWin(true);
      setIsGameActive(false);
      setGetStatsTrigger((prev) => prev + 1);
    }

    setBoard(newBoard);
  }

  return (
    <AdventureContext.Provider
      value={{
        board,
        newGame,
        movePlayer,
        collectedGems,
        event,
        gameOver,
        playerSprite,
        mapSkin,
        settings,
        setSettings,
        isGameActive,
        gameWin,
        getStatsTrigger,
        setScore,
        score,
        currentLevel,
        setCurrentLevel,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
}
