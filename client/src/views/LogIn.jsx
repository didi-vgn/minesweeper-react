import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { login_validation } from "../utils/validations";
import Form from "../components/Form";

export default function LogIn() {
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <Form onClick={onSubmit} buttonText='Log In'>
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
