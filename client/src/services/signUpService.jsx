export const signUpUser = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (response.status === 201) {
      return 201;
    } else {
      if (responseData.errors) {
        return responseData.errors;
      }
    }
  } catch (err) {
    console.error(err);
  }
};
