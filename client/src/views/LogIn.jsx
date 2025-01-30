import { FormProvider, useForm } from "react-hook-form";
import { login_validation } from "../utils/validations";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import { useState } from "react";
import { logInUser } from "../services/logInService";
import { useAuthContext } from "../context/AuthContext";

export default function LogIn() {
  const methods = useForm();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);
  const { login } = useAuthContext();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await logInUser(data);

      if (response.status === 200) {
        alert("Logged in!");
        console.log(response.accessToken);
        login(response.accessToken);
        navigate("/profile");
      } else {
        setServerErrors(response);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <FormProvider {...methods}>
      <Form onClick={onSubmit} buttonText='Log In' errors={serverErrors}>
        <Input
          label='username'
          type='text'
          id='username'
          placeholder='username...'
          {...login_validation}
        />
        <Input
          label='password'
          type='password'
          id='password'
          placeholder='password...'
          {...login_validation}
        />
      </Form>
    </FormProvider>
  );
}
