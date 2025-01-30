export const getGameStats = async (gameMode) => {
  try {
    const response = await fetch(`http://localhost:3000/games/${gameMode}`, {
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
