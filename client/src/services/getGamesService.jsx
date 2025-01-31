import { API_HOST } from "../utils/variables";

export const getGameStats = async (gameMode, nickname) => {
  const user = nickname ? `${nickname}/` : "";
  try {
    const response = await fetch(`${API_HOST}games/${gameMode}/${user}`, {
      method: "GET",
    });
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
