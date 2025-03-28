import LargeButton from "../../components/LargeButton";
import { useAuthContext } from "../../context/AuthContext";
import { deleteUser } from "../../services/accountServices";
import { toast } from "react-toastify";
import errorHandler from "../../utils/errorHandler";

export default function SettingsDeleteAccount() {
  const { user, token, logout } = useAuthContext();

  async function deleteAccount() {
    try {
      deleteUser(token, user.id);
      logout();
      toast.success("Account was deleted.");
    } catch (err) {
      errorHandler(err);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <div className='text-2xl text-center'>
        Would you like to permanently delete the account?
      </div>
      <div className='flex gap-5'>
        <LargeButton onClick={logout} text='No, log out instead!' />
        <LargeButton onClick={deleteAccount} text='Yes, delete the account!' />
      </div>
    </div>
  );
}
