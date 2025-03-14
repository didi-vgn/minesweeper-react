import { API_HOST } from "../utils/variables";

export const postGameStats = async (data) => {
  try {
    const response = await fetch(`${API_HOST}games/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
