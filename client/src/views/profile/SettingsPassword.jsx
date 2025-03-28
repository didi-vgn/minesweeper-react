import { FormProvider, useForm } from "react-hook-form";
import { password_validation } from "../../utils/validations";
import Input from "../../components/Input";
import Form from "../../components/Form";
import { useAuthContext } from "../../context/AuthContext";
import { updatePassword } from "../../services/accountServices";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandler";

export default function SettingsPassword() {
  const { user, token } = useAuthContext();
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await updatePassword(token, user.id, data);
      toast.success("Your password was updated!");
    } catch (err) {
      errorHandler(err);
    }
  });

  return (
    <div>
      <FormProvider {...methods}>
        <Form onClick={onSubmit} buttonText='Change Password'>
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
                value === methods.getValues("password") ||
                "Passwords don't match",
            }}
          />
        </Form>
      </FormProvider>
    </div>
  );
}
