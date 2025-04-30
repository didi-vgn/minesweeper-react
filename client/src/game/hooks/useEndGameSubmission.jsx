import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useAdvScoreMethod, useDunScoreMethod } from "./usePostScoreMethods";

export function useDunEndGameSubmission({
  gameState,
  timerRef,
  totalExtraTime,
  preferences,
  setGameState,
}) {
  const { user, token } = useAuthContext();
  const { postScore, postStats, postScoreGuest } = useDunScoreMethod();
  useEffect(() => {
    if (timerRef.current === 0 || gameState.status === "lost") {
      const score =
        gameState.level * 100 + gameState.gems * (25 + gameState.level);
      setGameState((prev) => ({ ...prev, score: score }));

      if (score >= 1000) {
        if (!user) {
          postScoreGuest({ points: score, depth: gameState.level });
        } else {
          postScore(token, { points: score, depth: gameState.level });
          postStats(token, {
            totalGems: gameState.gems,
            bombsScanned: gameState.bombsScanned,
            characterUsed: preferences.playerSkin,
            deaths: gameState.status === "lost" ? 1 : 0,
            depth: gameState.level,
            extraTime: totalExtraTime,
          });
        }
      }
    }
  }, [gameState.status, timerRef]);
}

export function useAdvEndGameSubmission({ gameState, preferences }) {
  const { user, token } = useAuthContext();
  const { postStats } = useAdvScoreMethod();
  useEffect(() => {
    if (user && (gameState.status === "won" || gameState.status === "lost")) {
      postStats(token, {
        totalGems: gameState.gems,
        bombsScanned: gameState.bombsScanned,
        characterUsed: preferences.playerSkin,
        levelsCompleted: gameState.status === "won" ? 1 : 0,
        deaths: gameState.status === "lost" ? 1 : 0,
        noScanWins: Number(
          gameState.status === "won" && !gameState.scannersUsed
        ),
      });
    }
  }, [gameState.status]);
}
