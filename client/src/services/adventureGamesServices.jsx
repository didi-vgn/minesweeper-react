import { API_HOST } from "../config/var";

export const getAdvGames = async (userId) => {
  const response = await fetch(`${API_HOST}games/adventure/${userId}`);
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const getAdvLeaderboard = async (nickname = null, sort, order) => {
  const response = await fetch(
    `${API_HOST}games/adventure/leaderboard?nickname=${nickname}&sort=${sort}&order=${order}`
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const getDunLeaderboard = async (nickname = null, sort, order) => {
  const response = await fetch(
    `${API_HOST}games/dungeon?nickname=${nickname}&sort=${sort}&order=${order}`
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const postDunScore = async (token, data) => {
  const response = await fetch(`${API_HOST}games/dungeon/`, {
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

export const postDunScoreGuest = async (data) => {
  const response = await fetch(`${API_HOST}games/dungeon/guest`, {
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

export const postAdvGameProgress = async (data, token) => {
  const response = await fetch(`${API_HOST}games/adventure/`, {
    method: "PUT",
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

export const postStatsAndUnlockAchievementsAdv = async (data, token) => {
  const response = await fetch(`${API_HOST}achievements/adventure`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const postStatsAndUnlockAchievementsDun = async (data, token) => {
  const response = await fetch(`${API_HOST}achievements/dungeon`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const getUserAchievements = async (userId) => {
  const response = await fetch(`${API_HOST}achievements/user/${userId}`);
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const getAllAchievements = async () => {
  const response = await fetch(`${API_HOST}achievements`);
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const addAchievement = async (data, token) => {
  const response = await fetch(`${API_HOST}achievements/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const deleteAchievementId = async (id, token) => {
  const response = await fetch(`${API_HOST}achievements/${id}`, {
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
