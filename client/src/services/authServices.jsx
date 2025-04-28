import { API_HOST } from "../config/var";

export const signUpUser = async (data) => {
  const response = await fetch(`${API_HOST}auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};

export const logInUser = async (data) => {
  const response = await fetch(`${API_HOST}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw responseData;
  }
  return responseData;
};
