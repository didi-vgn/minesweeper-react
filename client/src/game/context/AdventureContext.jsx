import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { generateStoryBoard } from "../logic/generateStoryBoard";
import { leftClick } from "../logic/click";
import { mapSkins, playerSprites } from "../utils/assets";
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
  });
  const [mapSkin, setMapSkin] = useState(null);
  const [playerSprite, setPlayerSprite] = useState(null);
  const [advGameWin, setAdvGameWin] = useState(false);
  const [getAdvStatsTrigger, setGetAdvStatsTrigger] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(null);

  const newGame = useCallback((levelData) => {
    setGameOver(false);
    setCollectedGems(0);
    const newBoard = generateStoryBoard(
      levelData.width,
      9,
      levelData.bombs,
      levelData.gems
    );
    setBoard(newBoard);
    setIsAdvGameActive(true);
    setAdvGameWin(false);
    setCurrentLevel(levelData.id);
    triggerEvent("normal");

    if (settings.character === "random") {
      setPlayerSprite(randomProp(playerSprites));
    } else setPlayerSprite(playerSprites[settings.character]);
    if (settings.map === "random") {
      setMapSkin(randomProp(mapSkins));
    } else setMapSkin(mapSkins[settings.map]);
  }, []);

  function triggerEvent(eventType) {
    setEvent(eventType);
    setTimeout(() => setEvent(null), 100);
  }

  const movePlayer = useCallback(
    (i, j) => {
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
        setIsAdvGameActive(false);
      }

      if (newBoard[i][j].gem.color === "golden") {
        setAdvGameWin(true);
        setIsAdvGameActive(false);
        setGetAdvStatsTrigger((prev) => prev + 1);
      }

      setBoard(newBoard);
    },
    [board]
  );

  const scan = useCallback(
    (i, j) => {
      const height = board.length;
      const width = board[0].length;
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
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
      setBoard(newBoard);
    },
    [board]
  );

  const contextValue = useMemo(
    () => ({
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
      getAdvStatsTrigger,
      setScore,
      score,
      currentLevel,
      setCurrentLevel,
      scan,
    }),
    [
      board,
      newGame,
      movePlayer,
      collectedGems,
      event,
      gameOver,
      playerSprite,
      mapSkin,
      settings,
      isAdvGameActive,
      advGameWin,
      getAdvStatsTrigger,
      score,
      currentLevel,
      scan,
    ]
  );

  return (
    <AdventureContext.Provider value={contextValue}>
      {children}
    </AdventureContext.Provider>
  );
}
