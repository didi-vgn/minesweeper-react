import { API_HOST } from "../utils/variables";

export const getUserAchievements = async (userId) => {
  try {
    const response = await fetch(`${API_HOST}achievements/user?id=${userId}`);
    const responseData = await response.json();

    if (response.ok) {
      return responseData.achievements;
    } else {
      return responseData;
    }
  } catch (err) {
    console.error(err);
  }
};
