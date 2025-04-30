import { createContext, useContext, useState } from "react";
import { leftClick } from "../logic/click";
import { playSoundEffect } from "../utils/assets";
import { adjacentCells } from "../utils/variables";
import { generateDungeonBoard } from "../logic/dungeonBoard";
import { generateAdventureBoard } from "../logic/adventureBoard";
import { random } from "../logic/mapGenHelpers";

const AdventureContext = createContext(null);

export function useAdventureContext() {
  return useContext(AdventureContext);
}

const mapOptions = ["snow", "cave", "forest"];
const playerOptions = ["blue", "pink", "yellow", "green", "white"];

export function AdventureProvider({ children }) {
  const [gameState, setGameState] = useState({
    board: [],
    status: "notStarted",
    gems: 0,
    scanners: 0,
    level: 0,
    score: 0,
    bombsScanned: 0,
    scannersUsed: false,
  });
  const [settings, setSettings] = useState({
    character: "random",
    map: "random",
    music: 0,
    sfx: 0.1,
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
          ? mapOptions[random(mapOptions.length)]
          : settings.map,
      playerSkin:
        settings.character === "random"
          ? playerOptions[random(playerOptions.length)]
          : settings.character,
    });
    setGameState({
      board: generateAdventureBoard(
        levelData.width,
        10,
        levelData.bombs,
        levelData.gems,
        levelData.scanners
      ),
      status: "active",
      gems: 0,
      scanners: 0,
      level: levelData.id,
      score: 0,
      bombsScanned: 0,
      scannersUsed: false,
    });
    triggerEvent("base");
  };

  const newDungeon = () => {
    setPreferences({
      mapSkin:
        settings.map === "random"
          ? mapOptions[random(mapOptions.length)]
          : settings.map,
      playerSkin:
        settings.character === "random"
          ? playerOptions[random(playerOptions.length)]
          : settings.character,
    });
    setGameState({
      board: generateDungeonBoard(1, 56, 24),
      status: "active",
      gems: 0,
      scanners: 0,
      level: 1,
      score: 0,
      bombsScanned: 0,
      scannersUsed: false,
    });
    triggerEvent("base");
  };

  const teleport = () => {
    setGameState((prev) => ({
      ...prev,
      board: generateDungeonBoard(prev.level + 1, 56, 24),
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
      !gameState.board[i][j].scanner &&
      !gameState.board[i][j].extraTime
    )
      return;
    !gameState.board[i][j].clicked &&
      playSoundEffect(preferences.mapSkin, settings.sfx);
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
    } else if (newBoard[i][j].extraTime) {
      triggerEvent("extraTime");
      playSoundEffect("collectGem", settings.sfx);
      newBoard[i][j].extraTime = false;
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
    setTimeout(() => {
      setGameState((prev) => {
        const newBoard = prev.board.map((row) =>
          row.map((cell) => ({ ...cell }))
        );
        let newBombsScanned = 0;
        const height = prev.board.length;
        const width = prev.board[0].length;
        adjacentCells.forEach(([r, c]) => {
          const newRow = r + i;
          const newCol = c + j;
          if (
            newRow >= 0 &&
            newRow < height &&
            newCol >= 0 &&
            newCol < width &&
            newBoard[newRow][newCol].value === -1 &&
            !newBoard[newRow][newCol].scanned
          ) {
            newBoard[newRow][newCol].scanned = true;
            newBombsScanned++;
          }
        });
        return {
          ...prev,
          board: newBoard,
          scanners: prev.scanners - 1,
          bombsScanned: prev.bombsScanned + newBombsScanned,
          scannersUsed: true,
        };
      });
    }, 500);
  };

  const actions = {
    newGame,
    newDungeon,
    teleport,
    movePlayer,
    scan,
  };

  const contextValue = {
    gameState,
    setGameState,
    preferences,
    settings,
    setSettings,
    event,
    actions,
  };

  return (
    <AdventureContext.Provider value={contextValue}>
      {children}
    </AdventureContext.Provider>
  );
}
