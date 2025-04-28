import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  postAdvGameProgress,
  postDunScore,
  postDunScoreGuest,
  postStatsAndUnlockAchievementsAdv,
  postStatsAndUnlockAchievementsDun,
} from "../../services/adventureGamesServices";
import NewAchievementToast from "../components/NewAchievementToast";

export function useDunScoreMethod() {
  const postStats = async (token, stats) => {
    try {
      const response = await postStatsAndUnlockAchievementsDun(stats, token);
      if (response.newAchievements.length > 0) {
        response.newAchievements.forEach((a) => {
          toast(({ closeToast }) => (
            <NewAchievementToast data={a} closeToast={closeToast} />
          ));
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postScore = async (token, data) => {
    try {
      await postDunScore(token, data);
    } catch (err) {
      console.error(err);
    }
  };

  const postScoreGuest = async (data) => {
    try {
      await postDunScoreGuest(data);
    } catch (err) {
      console.error(err);
    }
  };

  return { postStats, postScore, postScoreGuest };
}

export function useAdvScoreMethod() {
  async function postStats(token, stats) {
    try {
      const response = await postStatsAndUnlockAchievementsAdv(stats, token);
      if (response.newAchievements.length > 0) {
        response.newAchievements.map((a) => {
          toast(({ closeToast }) => (
            <NewAchievementToast data={a} closeToast={closeToast} />
          ));
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function postProgress(token, gameData) {
    try {
      await postAdvGameProgress(gameData, token);
    } catch (err) {
      console.error(err);
    }
  }

  return { postStats, postProgress };
}
