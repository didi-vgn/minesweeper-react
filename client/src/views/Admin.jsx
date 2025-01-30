import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

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
        const response = await fetch("http://localhost:3000/auth/role", {
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

  return (
    <div>
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
