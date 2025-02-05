import { createContext, useContext, useState } from "react";
import { generateBoard } from "../logic/generateBoard";
import { leftClick, rightClick } from "../logic/click";
import { checkWin } from "../logic/checkWin";
import { countFlags } from "../logic/countFlags";
import { calculateDifficulty } from "../logic/calculateDifficulty";
import { useStatsContext } from "./StatsContext";
import { boardToArray } from "../utils/boardToArray";

const GameContext = createContext(null);

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const { setStats } = useStatsContext();
  const [board, setBoard] = useState(() => generateBoard(16, 16, 40));
  const [bombs, setBombs] = useState(40);
  const [bombsLeft, setBombsLeft] = useState(bombs);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [getTimeTrigger, setGetTimeTrigger] = useState(0);

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
      setIsGameActive(false);

      setGetTimeTrigger((prev) => prev + 1);

      const arr = boardToArray(board);
      setStats((prevStats) => ({
        ...prevStats,
        bombs: bombs,
        bbbv: getBoardDifficulty(),
        board: JSON.stringify(arr),
      }));
    }

    if (!newBoard[i][j].flagged && newBoard[i][j].value === -1) {
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
        getTimeTrigger,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
