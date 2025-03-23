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
} from "../services/accountServices";
import { toast } from "react-toastify";
import errorHandler from "../utils/errorHandler";

export default function ProfileSettings() {
  const { user, token, logout, updateToken } = useAuthContext();
  const [selectedTab, setSelectedTab] = useState("nickname");
  const nicknameMethods = useForm();
  const passwordMethods = useForm();

  const nicknameOnSubmit = nicknameMethods.handleSubmit(async (data) => {
    try {
      const response = await updateNickname(token, user.id, data);
      updateToken(response.token);
      toast.success("Your nickname was updated!");
    } catch (err) {
      errorHandler(err);
    }
  });

  const passwordOnSubmit = passwordMethods.handleSubmit(async (data) => {
    try {
      await updatePassword(token, user.id, data);
      toast.success("Your password was updated!");
    } catch (err) {
      errorHandler(err);
    }
  });

  async function deleteAccount() {
    try {
      deleteUser(token, user.id);
      logout();
      toast.success("Account was deleted.");
    } catch (err) {
      errorHandler(err);
    }
  }

  function handleChangeTab(val) {
    setSelectedTab(val);
  }

  return (
    <div className='grid grid-cols-5'>
      <div className='flex flex-col'>
        <LargeButton
          onClick={() => handleChangeTab("nickname")}
          text='Change Nickname'
        />
        <LargeButton
          onClick={() => handleChangeTab("password")}
          text='Change Password'
        />
        <LargeButton
          onClick={() => handleChangeTab("delete")}
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
                <Form onClick={nicknameOnSubmit} buttonText='Confirm'>
                  <Input {...nickname_validation} />
                </Form>
              </FormProvider>
            </div>
          )}
          {selectedTab === "password" && (
            <div>
              <div className='text-2xl text-center mb-2'>
                Change your password
              </div>
              <FormProvider {...passwordMethods}>
                <Form onClick={passwordOnSubmit} buttonText='Confirm'>
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
