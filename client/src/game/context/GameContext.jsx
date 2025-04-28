import { createContext, useContext, useState } from "react";
import { leftClick, rightClick } from "../logic/click";
import { checkWin } from "../logic/checkWin";
import { countFlags } from "../logic/countFlags";
import { generateClassicBoard } from "../logic/classicBoard";

const GameContext = createContext(null);

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [config, setConfig] = useState({
    width: 16,
    height: 16,
    bombs: 40,
  });
  const [gameState, setGameState] = useState({
    board: generateClassicBoard(config.width, config.height, config.bombs),
    bombsLeft: 40,
    status: "notStarted",
  });

  const resetGame = (w = config.width, h = config.height, b = config.bombs) => {
    setGameState((prev) => ({
      ...prev,
      board: generateClassicBoard(w, h, b),
      bombsLeft: b,
      status: "notStarted",
    }));
  };

  const handleLeftClick = (i, j) => {
    if (gameState.status === "won" || gameState.status === "lost") return;

    if (gameState.status === "notStarted") {
      setGameState((prev) => ({
        ...prev,
        status: "active",
      }));

      if (gameState.board[i][j].value === -1) {
        const unluckyClick = generateClassicBoard(
          config.width,
          config.height,
          config.bombs,
          [[i, j]]
        );
        const newBoard = leftClick(unluckyClick, i, j);
        setGameState((prev) => ({
          ...prev,
          board: newBoard,
        }));
        return;
      }
    }

    const newBoard = leftClick(gameState.board, i, j);
    setGameState((prev) => ({ ...prev, board: newBoard }));

    if (checkWin(newBoard)) {
      setGameState((prev) => ({ ...prev, status: "won" }));
    } else if (!newBoard[i][j].flagged && newBoard[i][j].value === -1) {
      setGameState((prev) => ({ ...prev, status: "lost" }));
    }
  };

  const handleRightClick = (e, i, j) => {
    e.preventDefault();
    if (gameState.status === "won" || gameState.status === "lost") return;
    if (gameState.status === "notStarted") {
      setGameState((prev) => ({
        ...prev,
        status: "active",
      }));
    }

    const newBoard = rightClick(gameState.board, i, j);

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      bombsLeft: config.bombs - countFlags(newBoard),
    }));
  };

  const actions = {
    resetGame,
    handleLeftClick,
    handleRightClick,
  };

  const contextValue = {
    gameState,
    setGameState,
    actions,
    config,
    setConfig,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
