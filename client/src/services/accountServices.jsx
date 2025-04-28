import { API_HOST } from "../config/var";

export const getAllUsers = async () => {
  const response = await fetch(`${API_HOST}users`, {
    method: "GET",
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const updatePassword = async (token, userId, data) => {
  const response = await fetch(`${API_HOST}users/password/${userId}`, {
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

export const updateNickname = async (token, userId, data) => {
  const response = await fetch(`${API_HOST}users/nickname/${userId}`, {
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

export const deleteUser = async (token, userId) => {
  const response = await fetch(`${API_HOST}users/${userId}`, {
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

export const changeUserRole = async (token, userId, data) => {
  const response = await fetch(`${API_HOST}users/role/${userId}`, {
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
