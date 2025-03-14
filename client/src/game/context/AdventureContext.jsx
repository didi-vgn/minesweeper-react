import { createContext, useContext, useState } from "react";
import { generateStoryBoard } from "../logic/generateStoryBoard";
import { leftClick } from "../logic/click";
import { mapSkins, playerSprites, playSoundEffect } from "../utils/assets";
import { adjacentCells } from "../utils/variables";

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
  const [isAdvGameActive, setIsAdvGameActive] = useState(false);
  const [settings, setSettings] = useState({
    character: "random",
    map: "random",
    volume: 0.3,
  });
  const [mapSkin, setMapSkin] = useState(null);
  const [playerSprite, setPlayerSprite] = useState(null);
  const [advGameWin, setAdvGameWin] = useState(false);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [availableScanners, setAvailableScanners] = useState(0);

  const newGame = (levelData) => {
    setGameOver(false);
    setCollectedGems(0);
    const newBoard = generateStoryBoard(
      levelData.width,
      9,
      levelData.bombs,
      levelData.gems,
      levelData.scanners
    );
    setBoard(newBoard);
    setIsAdvGameActive(true);
    setAdvGameWin(false);
    setCurrentLevel(levelData.id);
    setAvailableScanners(0);
    triggerEvent("normal");

    if (settings.character === "random") {
      setPlayerSprite(randomProp(playerSprites));
    } else setPlayerSprite(playerSprites[settings.character]);
    if (settings.map === "random") {
      setMapSkin(randomProp(mapSkins));
    } else setMapSkin(mapSkins[settings.map]);
  };

  function triggerEvent(eventType) {
    setEvent(eventType);
    setTimeout(() => setEvent(null), 100);
  }

  const movePlayer = (i, j) => {
    if (
      board[i][j].clicked &&
      board[i][j].gem.color === "" &&
      !board[i][j].scanner
    )
      return;

    !board[i][j].clicked &&
      playSoundEffect(
        mapSkin.cover.split("_")[0].split("/")[2],
        settings.volume
      );
    const newBoard = leftClick(board, i, j);

    if (newBoard[i][j].gem.color !== "" && !newBoard[i][j].gem.collected) {
      newBoard[i][j] = {
        ...newBoard[i][j],
        gem: { ...newBoard[i][j].gem, collected: true },
      };

      triggerEvent(newBoard[i][j].gem.color);
      setCollectedGems((prev) => prev + 1);
      if (newBoard[i][j].gem.color !== "golden") {
        playSoundEffect("collectGem", settings.volume);
      }
    }

    if (newBoard[i][j].scanner === true) {
      newBoard[i][j] = {
        ...newBoard[i][j],
        scanner: false,
      };

      triggerEvent("scanner");
      setAvailableScanners((prev) => prev + 1);
      playSoundEffect("collectGem", settings.volume);
    }

    if (newBoard[i][j].value === -1) {
      triggerEvent("bomb");
      setGameOver(true);
      setIsAdvGameActive(false);
      playSoundEffect("bomb", settings.volume);
    }

    if (newBoard[i][j].gem.color === "golden") {
      setAdvGameWin(true);
      setIsAdvGameActive(false);
      playSoundEffect("win", settings.volume);
    }

    setBoard(newBoard);
  };

  const scan = (i, j) => {
    playSoundEffect("smoke", settings.volume);
    setTimeout(() => {
      setBoard((prev) => {
        const height = prev.length;
        const width = prev[0].length;
        const newBoard = prev.map((row) => row.map((cell) => ({ ...cell })));
        adjacentCells.forEach(([r, c]) => {
          const newRow = r + i;
          const newCol = c + j;

          if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
            newBoard[newRow][newCol] = {
              ...newBoard[newRow][newCol],
              scanned: true,
            };
          }
        });
        return newBoard;
      });
    }, 500);
    setAvailableScanners((prev) => prev - 1);
    triggerEvent("scan");
  };

  const contextValue = {
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
    isAdvGameActive,
    advGameWin,
    setScore,
    score,
    currentLevel,
    setCurrentLevel,
    scan,
    availableScanners,
  };

  return (
    <AdventureContext.Provider value={contextValue}>
      {children}
    </AdventureContext.Provider>
  );
}
