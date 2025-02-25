import { createContext, useContext, useState } from "react";
import { generateBoard } from "../logic/generateBoard";
import { leftClick, rightClick } from "../logic/click";
import { checkWin } from "../logic/checkWin";
import { countFlags } from "../logic/countFlags";

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
  const [gameWin, setGameWin] = useState(false);

  const resetGame = (w, h, b) => {
    setBoard(generateBoard(w, h, b));
    setBombs(b);
    setIsGameActive(false);
    setGameOver(false);
    setBombsLeft(b);
    setGameWin(false);
  };

  const handleLeftClick = (i, j) => {
    if (gameOver || gameWin) return;

    if (!isGameActive) {
      setIsGameActive(true);
      if (board[i][j].value === -1) {
        const gameMode = {
          10: {
            w: 9,
            h: 9,
          },
          40: {
            w: 16,
            h: 16,
          },
          99: {
            w: 30,
            h: 16,
          },
        }[bombs];
        const unluckyClick = generateBoard(gameMode.w, gameMode.h, bombs, [
          i,
          j,
        ]);
        const newBoard = leftClick(unluckyClick, i, j);
        setBoard(newBoard);
        return;
      }
    }

    const newBoard = leftClick(board, i, j);
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setIsGameActive(false);
      setGameWin(true);
    }

    if (!newBoard[i][j].flagged && newBoard[i][j].value === -1) {
      setIsGameActive(false);
      setGameOver(true);
    }
  };

  const handleRightClick = (e, i, j) => {
    e.preventDefault();
    if (gameOver || gameWin) return;
    !isGameActive && setIsGameActive(true);

    const newBoard = rightClick(board, i, j);

    setBoard(newBoard);
    setBombsLeft(bombs - countFlags(newBoard));
  };

  const contextValue = {
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
    gameWin,
  };
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
