import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import { API_HOST } from "../utils/variables";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const { user, token } = useAuthContext();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  ///testing token
  useEffect(() => {
    async function fetchRole() {
      try {
        const response = await fetch(`${API_HOST}auth/role`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // setUsers(da);
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchRole();
  }, []);

  async function deleteGames() {
    try {
      const response = await fetch(`${API_HOST}games/delete-all`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("All games deleted");
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <LargeButton onClick={deleteGames} text='Delete ALL Games' />
      {users.map((user) => (
        <div key={user.id}>
          {user.id} ||
          {user.username} ||
          {user.nickname} ||
          {user.role} ||
          {user.password.password}
        </div>
      ))}
    </div>
  );
}
