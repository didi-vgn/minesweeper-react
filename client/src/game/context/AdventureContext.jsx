import { createContext, useContext, useState } from "react";
import { generateStoryBoard } from "../logic/generateStoryBoard";
import { leftClick } from "../logic/click";

const AdventureContext = createContext(null);

export function useAdventureContext() {
  return useContext(AdventureContext);
}

export function AdventureProvider({ children }) {
  const [board, setBoard] = useState([]);
  const [playerFrame, setPlayerFrame] = useState(0);
  const [gems, setGems] = useState(0);
  const [event, setEvent] = useState(null);
  const [bombs, setBombs] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function surviveLevel(width, height, bombs) {
    setGameOver(false);
    setGems(0);
    const newBoard = generateStoryBoard(width, height, bombs);
    setBombs(bombs);
    setBoard(newBoard);
  }

  function triggerEvent(eventType) {
    setEvent(eventType);
    setTimeout(() => setEvent(null), 100);
  }

  function movePlayer(i, j) {
    const newBoard = leftClick(board, i, j);

    newBoard[i][j] = { ...newBoard[i][j], clicked: true };
    if (newBoard[i][j].gem.color !== "" && !newBoard[i][j].gem.collected) {
      newBoard[i][j] = {
        ...newBoard[i][j],
        gem: { ...newBoard[i][j].gem, collected: true },
      };
      triggerEvent(newBoard[i][j].gem.color);

      setGems((prev) => prev + 1);
    }

    if (newBoard[i][j].value === -1) {
      triggerEvent("bomb");
      setGameOver(true);
    }

    setBoard(newBoard);
  }

  return (
    <AdventureContext.Provider
      value={{
        board,
        surviveLevel,
        movePlayer,
        playerFrame,
        setPlayerFrame,
        gems,
        event,
        bombs,
        gameOver,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
}
