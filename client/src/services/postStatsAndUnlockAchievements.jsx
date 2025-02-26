import { API_HOST } from "../utils/variables";

export async function postStatsAndUnlockAchievements(data) {
  try {
    const response = await fetch(`${API_HOST}achievements/update-stats`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
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
