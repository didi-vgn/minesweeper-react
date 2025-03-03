// import { API_HOST } from "../utils/variables";

// export const deleteUser = async (token, userId) => {
//   try {
//     const response = await fetch(`${API_HOST}users/delete/${userId}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const responseData = await response.json();

//     if (response.ok) {
//       console.log("User deleted!");
//       return;
//     } else {
//       return responseData;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
