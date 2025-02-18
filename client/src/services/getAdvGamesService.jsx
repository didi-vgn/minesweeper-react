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
