import { API_HOST } from "../utils/variables";

export const getAdvGames = async (userId) => {
  const response = await fetch(`${API_HOST}games/adventure/${userId}`);
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

export async function postStatsAndUnlockAchievements(data, token) {
  const response = await fetch(`${API_HOST}achievements/`, {
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
}

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
