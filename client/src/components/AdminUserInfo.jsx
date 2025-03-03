import { useState } from "react";
import Button from "./Button";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { nickname_validation } from "../utils/validations";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import { useAuthContext } from "../context/AuthContext";
import {
  changeUserRole,
  deleteUser,
  updateNickname,
} from "../services/userServices";

export default function AdminUserInfo({ user }) {
  const { token } = useAuthContext();
  const [expand, setExpand] = useState(false);
  const methods = useForm();
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  function expandInfo() {
    setExpand(!expand);
  }

  async function changeRole() {
    try {
      const response = await changeUserRole(token, user.id, {
        role: user.role === "ADMIN" ? "USER" : "ADMIN",
      });

      if (response.message) {
        setMessage(response.message);
        setErrors([]);
      } else {
        console.log(response);

        setErrors(response.errors);
      }
    } catch (error) {}
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await updateNickname(token, user.id, data);
      if (response.message) {
        setMessage(response.message);
        setErrors([]);
      } else {
        setErrors(response.errors);
      }
    } catch (error) {}
  });

  async function deleteUserById() {
    try {
      deleteUser(token, user.id);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <div
        className='grid grid-cols-[2fr_1fr_1fr_1fr] items-center my-1 bg-white p-1 shadow-sm cursor-pointer'
        onClick={expandInfo}
      >
        <div>{user.id}</div>
        <div>{user.username}</div>
        <div>{user.nickname}</div>
        <div className='flex'>
          {user.role}
          <div className='text-2xl'>
            {expand ? <RxTriangleUp /> : <RxTriangleDown />}
          </div>
        </div>
      </div>
      {expand && (
        <div className='flex justify-around bg-white shadow-sm'>
          <div>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <div className='flex flex-col'>
                  <Input {...nickname_validation} />
                  <Button text='Update Name' />
                </div>
              </form>
              <div className='h-10 text-center text-pink-600 m-5 text-xl'>
                {message
                  ? message
                  : errors
                  ? errors.map((err, i) => <div key={i}>{err.error}</div>)
                  : ""}
              </div>
            </FormProvider>
          </div>
          <div className='flex flex-col'>
            <Button
              onClick={changeRole}
              text={user.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
            />
            <Button onClick={deleteUserById} text='Delete User' />
          </div>
        </div>
      )}
    </div>
  );
}
