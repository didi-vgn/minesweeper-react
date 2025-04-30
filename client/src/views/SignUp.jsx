import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../components/Form";
import Input from "../components/Input";
import {
  username_validation,
  nickname_validation,
  password_validation,
} from "../utils/validations";
import { signUpUser } from "../services/authServices";
import errorHandler from "../utils/errorHandler";
import { toast } from "react-toastify";
const BASE_PATH = import.meta.env.BASE_URL;

export default function SignUp() {
  const methods = useForm();
  const navigate = useNavigate();
  const password = methods.watch("password");

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await signUpUser(data);
      navigate(`${BASE_PATH}/profile`);
      toast.success("Account created successfully!");
    } catch (err) {
      errorHandler(err);
    }
  });

  return (
    <div className='custom-border bg-gray-300 mx-auto p-2 w-2/5 m-10'>
      <div className='custom-border-rev bg-gray-100 h-full flex justify-center items-center p-10'>
        <FormProvider {...methods}>
          <Form onClick={onSubmit} buttonText='Sign Up'>
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
