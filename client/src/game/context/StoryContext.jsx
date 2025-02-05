import { createContext, useContext, useState } from "react";
import { generateStoryBoard } from "../logic/generateStoryBoard";
import { leftClick } from "../logic/click";

const StoryContext = createContext(null);

export function useStoryContext() {
  return useContext(StoryContext);
}

export function StoryProvider({ children }) {
  const [board, setBoard] = useState(() => generateStoryBoard(100, 9, 100));

  function movePlayer(i, j) {
    // const newBoard = board.map((row) => row.slice());
    const newBoard = leftClick(board, i, j);

    newBoard[i][j].clicked = true;
    setBoard(newBoard);
  }

  return (
    <StoryContext.Provider value={{ board, setBoard, movePlayer }}>
      {children}
    </StoryContext.Provider>
  );
}
