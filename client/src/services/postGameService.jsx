import { API_HOST } from "../utils/variables";

export const postGameStats = async (data, token) => {
  try {
    const response = await fetch(`${API_HOST}games/`, {
      method: "POST",
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

export const postGameStatsGuest = async (data) => {
  try {
    const response = await fetch(`${API_HOST}games/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
