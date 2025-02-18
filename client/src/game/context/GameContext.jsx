import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
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

  const resetGame = useCallback((w, h, b) => {
    setBoard(generateBoard(w, h, b));
    setBombs(b);
    setIsGameActive(false);
    setGameOver(false);
    setBombsLeft(b);
    setGameWin(false);
  }, []);

  const handleLeftClick = useCallback(
    (i, j) => {
      if (gameOver || gameWin) return;
      !isGameActive && setIsGameActive(true);
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
    },
    [board, gameOver, gameWin, isGameActive]
  );

  const handleRightClick = useCallback(
    (e, i, j) => {
      e.preventDefault();
      if (gameOver || gameWin) return;
      !isGameActive && setIsGameActive(true);

      const newBoard = rightClick(board, i, j);

      setBoard(newBoard);
      setBombsLeft(bombs - countFlags(newBoard));
    },
    [board, gameOver, gameWin, isGameActive]
  );

  const contextValue = useMemo(
    () => ({
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
    }),
    [
      board,
      bombs,
      bombsLeft,
      isGameActive,
      gameOver,
      gameWin,
      handleLeftClick,
      handleRightClick,
      resetGame,
    ]
  );
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
