import { API_HOST } from "../utils/variables";

export const getGameScores = async (
  gameMode,
  nickname,
  sort = "points",
  order = "desc"
) => {
  const response = await fetch(
    `${API_HOST}games?gameMode=${gameMode}&nickname=${nickname}&sort=${sort}&order=${order}`
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const deleteAllGames = async (token) => {
  const response = await fetch(`${API_HOST}games/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const postGameStats = async (data, token) => {
  const response = await fetch(`${API_HOST}games/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const postGameStatsGuest = async (data) => {
  const response = await fetch(`${API_HOST}games/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const getMinesweeperStats = async () => {
  const response = await fetch(`${API_HOST}games/stats`);
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};
