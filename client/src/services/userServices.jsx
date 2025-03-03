import { API_HOST } from "../utils/variables";

export const updatePassword = async (token, userId, data) => {
  try {
    const response = await fetch(`${API_HOST}users/update-password/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
};

export const updateNickname = async (token, userId, data) => {
  try {
    const response = await fetch(`${API_HOST}users/update-nickname/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (token, userId) => {
  try {
    const response = await fetch(`${API_HOST}users/delete/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("User deleted!");
      return;
    } else {
      return responseData;
    }
  } catch (err) {
    console.error(err);
  }
};

export const changeUserRole = async (token, userId, data) => {
  try {
    const response = await fetch(`${API_HOST}users/update-role/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
};
