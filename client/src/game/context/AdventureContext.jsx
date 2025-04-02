import { createContext, useContext, useState } from "react";
import { generateAdventureBoard } from "../logic/campaignBoard";
import { leftClick } from "../logic/click";
import { mapSkins, playerSprites, playSoundEffect } from "../utils/assets";
import { adjacentCells } from "../utils/variables";
import { generateDungeonBoard } from "../logic/dungeonBoard";

const AdventureContext = createContext(null);

export function useAdventureContext() {
  return useContext(AdventureContext);
}

const randomProp = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};

export function AdventureProvider({ children }) {
  const [gameState, setGameState] = useState({
    board: [],
    status: "notStarted",
    gems: 0,
    scanners: 0,
    level: 0,
    score: 0,
  });
  const [settings, setSettings] = useState({
    character: "random",
    map: "random",
    music: 0.3,
    sfx: 0.4,
  });
  const [preferences, setPreferences] = useState({
    mapSkin: null,
    playerSkin: null,
  });

  const [event, setEvent] = useState(null);

  const newGame = (levelData) => {
    setPreferences({
      mapSkin:
        settings.map === "random"
          ? randomProp(mapSkins)
          : mapSkins[settings.map],
      playerSkin:
        settings.character === "random"
          ? randomProp(playerSprites)
          : playerSprites[settings.character],
    });
    setGameState({
      board: generateAdventureBoard(
        levelData.width,
        9,
        levelData.bombs,
        levelData.gems,
        levelData.scanners
      ),
      status: "active",
      gems: 0,
      scanners: 0,
      level: levelData.id,
      score: 0,
    });
    triggerEvent("base");
  };

  ////test
  const newDungeon = () => {
    setPreferences({
      mapSkin:
        settings.map === "random"
          ? randomProp(mapSkins)
          : mapSkins[settings.map],
      playerSkin:
        settings.character === "random"
          ? randomProp(playerSprites)
          : playerSprites[settings.character],
    });
    setGameState({
      board: generateDungeonBoard(1, 59, 26),
      status: "active",
      gems: 0,
      scanners: 0,
      level: 1,
      score: 0,
    });
    triggerEvent("base");
  };

  const teleport = () => {
    setGameState((prev) => ({
      ...prev,
      board: generateDungeonBoard(prev.level + 1, 59, 26),
      level: prev.level + 1,
    }));
  };

  function triggerEvent(eventType) {
    setEvent(eventType);
    setTimeout(() => setEvent(null), 100);
  }

  const movePlayer = (i, j) => {
    if (
      gameState.board[i][j].clicked &&
      !gameState.board[i][j].gem &&
      !gameState.board[i][j].scanner
    )
      return;
    !gameState.board[i][j].clicked &&
      playSoundEffect(
        preferences.mapSkin.cover.split("_")[0].split("/")[2],
        settings.sfx
      );
    const newBoard = leftClick(gameState.board, i, j);
    const newState = {
      gems: 0,
      scanners: 0,
      status: "active",
    };

    if (newBoard[i][j].gem) {
      triggerEvent(newBoard[i][j].gem);
      if (newBoard[i][j].gem !== "golden") {
        playSoundEffect("collectGem", settings.sfx);
        newBoard[i][j].gem = null;
        newState.gems = 1;
      } else if (newBoard[i][j].gem === "golden") {
        playSoundEffect("win", settings.sfx);
        newBoard[i][j].gem = null;
        newState.gems = 1;
        newState.status = "won";
      }
    } else if (newBoard[i][j].scanner) {
      triggerEvent("scanner");
      playSoundEffect("collectGem", settings.sfx);
      newBoard[i][j].scanner = false;
      newState.scanners = 1;
    } else if (newBoard[i][j].value === -1) {
      triggerEvent("bomb");
      playSoundEffect("bomb", settings.sfx);
      newState.status = "lost";
    }

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      gems: prev.gems + newState.gems,
      scanners: prev.scanners + newState.scanners,
      status: newState.status,
    }));
  };

  const scan = (i, j) => {
    playSoundEffect("smoke", settings.sfx);
    triggerEvent("scan");
    setGameState((prev) => ({
      ...prev,
      scanners: prev.scanners - 1,
    }));

    setTimeout(() => {
      const newBoard = gameState.board.map((row) =>
        row.map((cell) => ({ ...cell }))
      );
      const height = gameState.board.length;
      const width = gameState.board[0].length;
      adjacentCells.forEach(([r, c]) => {
        const newRow = r + i;
        const newCol = c + j;
        if (
          newRow >= 0 &&
          newRow < height &&
          newCol >= 0 &&
          newCol < width &&
          newBoard[newRow][newCol].value === -1
        ) {
          newBoard[newRow][newCol].scanned = true;
        }
      });
      setGameState((prev) => ({
        ...prev,
        board: newBoard,
      }));
    }, 500);
  };

  const contextValue = {
    gameState,
    setGameState,
    preferences,
    settings,
    event,
    setSettings,
    newGame,
    movePlayer,
    scan,
    newDungeon,
    teleport,
  };

  return (
    <AdventureContext.Provider value={contextValue}>
      {children}
    </AdventureContext.Provider>
  );
}
