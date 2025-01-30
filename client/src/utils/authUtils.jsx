export const isTokenValid = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() < exp * 1000;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};
