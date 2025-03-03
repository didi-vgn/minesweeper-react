import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../components/Form";
import Input from "../components/Input";
import {
  username_validation,
  nickname_validation,
  password_validation,
} from "../utils/validations";
import { signUpUser } from "../services/signUpService";

export default function SignUp() {
  const [serverErrors, setServerErrors] = useState([]);
  const methods = useForm();
  const navigate = useNavigate();
  const password = methods.watch("password");

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await signUpUser(data);
      if (response === 201) {
        setServerErrors([]);
        navigate("/profile");
      } else {
        setServerErrors(response);
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className='custom-border bg-gray-300 mx-auto p-2 w-2/5 m-10'>
      <div className='custom-border-rev bg-gray-100 h-full flex justify-center items-center p-10'>
        <FormProvider {...methods}>
          <Form onClick={onSubmit} buttonText='Sign Up' errors={serverErrors}>
            <Input {...username_validation} />
            <Input {...nickname_validation} />
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
                  value === password || "Passwords don't match",
              }}
            />
          </Form>
        </FormProvider>
      </div>
    </div>
  );
}
