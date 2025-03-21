import { API_HOST } from "../utils/variables";

export const getAdvGames = async (userId) => {
  try {
    const response = await fetch(`${API_HOST}games/adventure/${userId}`);
    const responseData = await response.json();
    if (response.status === 200) {
      return { status: 200, games: responseData.games };
    } else {
      return responseData;
    }
  } catch (err) {
    console.log(err);
  }
};

export const postAdvGameStats = async (data, token) => {
  try {
    const response = await fetch(`${API_HOST}games/adventure/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status === 201) {
      return 201;
    } else {
      return responseData;
    }
  } catch (err) {
    console.log(err);
  }
};

export async function postStatsAndUnlockAchievements(data, token) {
  try {
    const response = await fetch(`${API_HOST}achievements/`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData.newAchievements;
    } else {
      return responseData;
    }
  } catch (err) {
    console.error(err);
  }
}
