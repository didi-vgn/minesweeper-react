import { useEffect } from "react";

export function useDunGameControls({
  gameState,
  player,
  setPlayer,
  toggleZoom,
  actions,
  setViewport,
}) {
  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();

      if (e.key === "Tab") {
        toggleZoom();
      }

      if (gameState.status === "active") {
        setPlayer((prev) => {
          let { x, y } = prev;
          if (
            e.key === "ArrowUp" &&
            y > 0 &&
            gameState.board[y - 1][x].value > -2
          )
            y--;
          if (
            e.key === "ArrowLeft" &&
            x > 0 &&
            gameState.board[y][x - 1].value > -2
          )
            x--;
          if (
            e.key === "ArrowDown" &&
            y < gameState.board.length - 1 &&
            gameState.board[y + 1][x].value > -2
          )
            y++;
          if (
            e.key === "ArrowRight" &&
            x < gameState.board[0].length - 1 &&
            gameState.board[y][x + 1].value > -2
          )
            x++;
          return { x, y };
        });

        if (e.key === " " && gameState.scanners > 0) {
          actions.scan(player.y, player.x);
        }

        if (e.key === "e" && gameState.board[player.y][player.x].portal) {
          actions.teleport();
          const x = Math.floor(gameState.board[0].length / 2);
          const y = Math.floor(gameState.board.length / 2);
          setPlayer({ x, y });
          setViewport({ x, y });
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.status, player, toggleZoom]);
}

export function useAdvGameControls({
  player,
  setPlayer,
  viewportStart,
  gameState,
  actions,
}) {
  useEffect(() => {
    function handleKeyPress(e) {
      e.preventDefault();
      if (gameState.status === "active") {
        setPlayer((prev) => {
          let { x, y } = prev;

          if (e.key === "ArrowUp" && y > 0) y--;
          if (e.key === "ArrowLeft" && x > viewportStart) x--;
          if (e.key === "ArrowDown" && y < gameState.board.length - 1) y++;
          if (e.key === "ArrowRight" && x < gameState.board[0].length - 1) x++;
          return { x, y };
        });

        if (e.key === " " && gameState.scanners > 0) {
          actions.scan(player.y, player.x);
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [viewportStart, gameState.status, player]);
}
