import { API_HOST } from "../utils/variables";

export const logInUser = async (data) => {
  try {
    const response = await fetch(`${API_HOST}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.status === 200) {
      return { status: 200, accessToken: responseData };
    } else {
      return [responseData];
    }
  } catch (err) {
    console.error("Login failed.", err);
  }
};
