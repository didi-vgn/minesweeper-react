import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import LargeButton from "../components/LargeButton";
import { API_HOST } from "../utils/variables";
import Form from "../components/Form";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const { user, token } = useAuthContext();
  const methods = useForm();

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
    <div>
      <FormProvider {...methods}>
        <div className='text-3xl m-5 text-center'>Add new Achievements</div>
        <Form onClick={onSubmit} buttonText='New Achievement'>
          <Input label='Title' type='text' id='title' placeholder='title...' />
          <Input
            label='Description'
            type='text'
            id='description'
            placeholder='description...'
          />
          <Input
            label='Icon'
            type='text'
            id='icon'
            placeholder='image path...'
          />
          <Input
            label='Condition'
            type='text'
            id='condition'
            placeholder='condition...'
          />
        </Form>
      </FormProvider>
      <hr />
      <div className='text-3xl m-5 text-center'>List of Achievements</div>
      <div className='flex flex-col gap-5 m-5'>
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className='grid grid-cols-[5rem_1fr_1fr_1fr] bg-gray-100 shadow-sm gap-4 items-center w-8/10 m-auto rounded-lg p-2'
          >
            <img
              src={`achievements/${achievement.icon}`}
              alt=''
              className='size-15'
            />
            <div className='font-bold'>{achievement.title}</div>
            <div>{achievement.description}</div>
            <div>{achievement.condition}</div>
          </div>
        ))}
      </div>
      <hr />
      <div className='text-3xl m-5 text-center'>
        Delete all games from database
      </div>
      <LargeButton onClick={deleteGames} text='Delete ALL Games' />
      <hr />
      <div className='text-3xl m-5 text-center'>List of all users</div>
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
