import { FormProvider, useForm } from "react-hook-form";
import { nickname_validation, password_validation } from "../utils/validations";
import Input from "../components/Input";
import LargeButton from "../components/LargeButton";
import Form from "../components/Form";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  deleteUser,
  updateNickname,
  updatePassword,
} from "../services/userServices";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function ProfileSettings() {
  const { user, token, logout, updateToken } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState("nickname");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const nicknameMethods = useForm();
  const passwordMethods = useForm();

  const nicknameOnSubmit = nicknameMethods.handleSubmit(async (data) => {
    try {
      const response = await updateNickname(token, user.id, data);

      if (response.token) {
        updateToken(response.token);
        setMessage(response.message);
        setErrors([]);
      } else {
        setErrors(response.errors);
      }
    } catch (err) {
      console.error(err);
    }
  });

  const passwordOnSubmit = passwordMethods.handleSubmit(async (data) => {
    try {
      const response = await updatePassword(token, user.id, data);
      if (!response.errors) {
        setMessage(response.message);
        setErrors([]);
      } else {
        setErrors(response.errors);
      }
    } catch (err) {
      console.error(err);
    }
  });

  async function deleteAccount() {
    try {
      deleteUser(token, user.id);
      logout();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='grid grid-cols-5'>
      <div className='flex flex-col'>
        <LargeButton
          onClick={() => setSelectedTab("nickname")}
          text='Change Nickname'
        />
        <LargeButton
          onClick={() => setSelectedTab("password")}
          text='Change Password'
        />
        <LargeButton
          onClick={() => setSelectedTab("delete")}
          text='Delete Account'
        />
      </div>
      <div className='custom-border bg-gray-300 h-[35rem] w-4/5 mx-auto p-2 col-span-3'>
        <div className='custom-border-rev bg-gray-100 h-full flex justify-center items-center'>
          {selectedTab === "nickname" && (
            <div>
              <div className='text-2xl text-center mb-2'>
                Change your nickname
              </div>
              <FormProvider {...nicknameMethods}>
                <Form
                  onClick={nicknameOnSubmit}
                  buttonText='Confirm'
                  errors={[]}
                >
                  <Input {...nickname_validation} />
                </Form>
              </FormProvider>
              <div className='h-10 text-center text-pink-600 m-3 text-xl'>
                {message
                  ? message
                  : errors
                  ? errors.map((err, i) => (
                      <div
                        key={i}
                        className='flex justify-center items-center text-pink-600 text-3xl font-bold gap-3'
                      >
                        <MdOutlineErrorOutline />
                        {err.error}
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          )}
          {selectedTab === "password" && (
            <div>
              <div className='text-2xl text-center mb-2'>
                Change your password
              </div>
              <FormProvider {...passwordMethods}>
                <Form
                  onClick={passwordOnSubmit}
                  buttonText='Confirm'
                  errors={[]}
                >
                  <Input {...password_validation} />
                  <Input
                    label='confirm password:'
                    type='password'
                    id='confirmPassword'
                    placeholder='confirm password...'
                    validation={{
                      required: {
                        value: true,
                        message: "Required",
                      },
                      validate: (value) =>
                        value === passwordMethods.getValues("password") ||
                        "Passwords don't match",
                    }}
                  />
                </Form>
              </FormProvider>
              <div className='h-10 text-center text-pink-600 m-3 text-2xl'>
                {message
                  ? message
                  : errors
                  ? errors.map((err, i) => <div key={i}>{err.error}</div>)
                  : ""}
              </div>
            </div>
          )}
          {selectedTab === "delete" && (
            <div className='flex flex-col justify-center items-center gap-10'>
              <div className='text-2xl text-center'>
                Would you like to permanently delete the account?
              </div>
              <div className='flex gap-5'>
                <LargeButton onClick={logout} text='No, log out instead!' />
                <LargeButton
                  onClick={deleteAccount}
                  text='Yes, delete the account!'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
