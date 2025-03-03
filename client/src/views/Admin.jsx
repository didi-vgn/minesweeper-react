import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { API_HOST } from "../utils/variables";
import Form from "../components/Form";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import LargeButton from "../components/LargeButton";
import { useNavigate } from "react-router-dom";
import AdminUserInfo from "../components/AdminUserInfo";
import Button from "../components/Button";

export default function Admin() {
  const { user } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const { token } = useAuthContext();
  const methods = useForm();
  const navigate = useNavigate();

  if (user.role !== "ADMIN") {
    navigate("/forbidden");
  }

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

  async function deleteAchievement(id) {
    try {
      const response = await fetch(`${API_HOST}achievements/delete/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.message);
      } else {
        console.error(response.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function addAchievement(data) {
    try {
      const response = await fetch(`${API_HOST}achievements/add-achievement`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("New achievement added!");
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await addAchievement(data);
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await fetch(`${API_HOST}achievements`);
        if (response.ok) {
          const data = await response.json();
          setAchievements(data.achievements);
        } else {
          const errorData = await response.json();
          console.error(errorData);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAchievements();
  }, []);

  return (
    <div className='grid grid-cols-5'>
      <div className='flex flex-col'>
        <LargeButton onClick={() => setSelectedTab("users")} text='Users' />
        <LargeButton
          onClick={() => setSelectedTab("achievements")}
          text='All Achievements'
        />
        <LargeButton
          onClick={() => setSelectedTab("newAchievement")}
          text='Add New Achievement'
        />
        <LargeButton
          onClick={() => setSelectedTab("games")}
          text='Minesweeper Games'
        />
      </div>
      <div className='custom-border bg-gray-300 h-[45rem] p-2 col-span-3'>
        <div className='custom-border-rev bg-gray-100 h-full p-2 overflow-scroll overflow-x-hidden'>
          {selectedTab === "users" && (
            <div>
              <div className='grid grid-cols-[2fr_1fr_1fr_1fr] items-center my-1 p-1 border-b font-bold'>
                <div>UUID</div>
                <div>Username</div>
                <div>Nickname</div>
                <div>Role</div>
              </div>
              {users.map((user) => (
                <AdminUserInfo key={user.id} user={user} />
              ))}
            </div>
          )}
          {selectedTab === "achievements" && (
            <div>
              <div className='grid grid-cols-[70px_1fr_1fr_1fr_170px] gap-2 items-center my-1 p-1 border-b font-bold'>
                <div>Icon</div>
                <div>Title</div>
                <div>Description</div>
                <div>ID</div>
              </div>
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className='grid grid-cols-[70px_1fr_1fr_1fr_170px] gap-2 items-center my-1 bg-white p-1 shadow-sm'
                >
                  <img
                    src={`/achievements/${achievement.id}.png`}
                    alt={`${achievement.title}`}
                    className='size-15'
                  />
                  <div className='font-bold'>{achievement.title}</div>
                  <div className='text-gray-500'>{achievement.description}</div>
                  <div>{achievement.id}</div>
                  <Button
                    onClick={() => deleteAchievement(achievement.id)}
                    text='Delete'
                  />
                </div>
              ))}
            </div>
          )}
          {selectedTab === "newAchievement" && (
            <div className='my-15'>
              <FormProvider {...methods}>
                <div className='text-4xl m-5 text-center'>
                  Add New Achievements
                </div>
                <Form onClick={onSubmit} buttonText='Add'>
                  <Input label='ID:' type='text' id='id' placeholder='id...' />
                  <Input
                    label='Title:'
                    type='text'
                    id='title'
                    placeholder='title...'
                  />
                  <Input
                    label='Description:'
                    type='text'
                    id='description'
                    placeholder='description...'
                  />
                </Form>
              </FormProvider>
            </div>
          )}
          {selectedTab === "games" && (
            <div className='my-50'>
              <div className='text-4xl my-5 text-center'>
                Delete all games from the database
              </div>
              <LargeButton onClick={deleteGames} text='Delete ALL Games' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
