import { FormProvider, useForm } from "react-hook-form";
import { nickname_validation } from "../../utils/validations";
import Input from "../../components/Input";
import Form from "../../components/Form";
import { useAuthContext } from "../../context/AuthContext";
import { updateNickname } from "../../services/accountServices";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandler";

export default function SettingsNickname() {
  const { user, token, updateToken } = useAuthContext();
  const methods = useForm();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await updateNickname(token, user.id, data);
      updateToken(response.token);
      toast.success("Your nickname was updated!");
    } catch (err) {
      errorHandler(err);
    }
  });

  return (
    <div>
      <FormProvider {...methods}>
        <Form onClick={onSubmit} buttonText='Change Nickname'>
          <Input {...nickname_validation} />
        </Form>
      </FormProvider>
    </div>
  );
}
