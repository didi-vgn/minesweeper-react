import { createContext, useContext, useState } from "react";
import { generateBoard } from "../logic/generateBoard";
import { leftClick, rightClick } from "../logic/click";
import { checkWin } from "../logic/checkWin";
import { countFlags } from "../logic/countFlags";
import { calculateDifficulty } from "../logic/calculateDifficulty";

const GameContext = createContext(null);

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [board, setBoard] = useState(() => generateBoard(16, 16, 40));
  const [bombs, setBombs] = useState(40);
  const [bombsLeft, setBombsLeft] = useState(bombs);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function resetGame(w, h, b) {
    setBoard(generateBoard(w, h, b));
    setBombs(b);
    setIsGameActive(false);
    setGameOver(false);
    setBombsLeft(b);
  }

  function handleLeftClick(i, j) {
    if (gameOver) return;
    !isGameActive && setIsGameActive(true);
    const newBoard = leftClick(board, i, j);

    setBoard(newBoard);

    if (checkWin(newBoard)) {
      console.log("Won!");
      setIsGameActive(false);
    }

    if (newBoard[i][j].value === -1) {
      setIsGameActive(false);
      setGameOver(true);
    }
  }

  function handleRightClick(e, i, j) {
    e.preventDefault();
    if (gameOver || checkWin(board)) return;
    !isGameActive && setIsGameActive(true);

    const newBoard = rightClick(board, i, j);

    setBoard(newBoard);
    setBombsLeft(bombs - countFlags(newBoard));
  }

  function getBoardDifficulty() {
    return calculateDifficulty(board);
  }

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        bombs,
        bombsLeft,
        setBombsLeft,
        isGameActive,
        setIsGameActive,
        gameOver,
        setGameOver,
        handleLeftClick,
        handleRightClick,
        resetGame,
        getBoardDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
