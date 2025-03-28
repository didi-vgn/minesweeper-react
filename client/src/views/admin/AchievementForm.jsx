import Form from "../../components/Form";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { addAchievement } from "../../services/adventureGamesServices";
import errorHandler from "../../utils/errorHandler";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export default function AchievementForm() {
  const methods = useForm();
  const { token } = useAuthContext();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await addAchievement(data, token);
      toast.success(`Achevement ID ${data.id} was added!`);
    } catch (err) {
      errorHandler(err);
    }
  });

  return (
    <div className='my-15'>
      <FormProvider {...methods}>
        <Form onClick={onSubmit} buttonText='Create Achievement'>
          <Input label='ID:' type='text' id='id' placeholder='id...' />
          <Input label='Title:' type='text' id='title' placeholder='title...' />
          <Input
            label='Description:'
            type='text'
            id='description'
            placeholder='description...'
          />
        </Form>
      </FormProvider>
    </div>
  );
}
