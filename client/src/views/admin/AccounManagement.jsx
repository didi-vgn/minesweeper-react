import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../components/Button";
import { getAllUsers } from "../../services/accountServices";
import errorHandler from "../../utils/errorHandler";
import { useAuthContext } from "../../context/AuthContext";
import { RxTriangleDown } from "react-icons/rx";
import { RxTriangleUp } from "react-icons/rx";
import {
  changeUserRole,
  deleteUser,
  updateNickname,
} from "../../services/accountServices";
import { toast } from "react-toastify";
import { nickname_validation } from "../../utils/validations";

export default function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        setUsers(response.users);
      } catch (err) {
        errorHandler(err);
      }
    }
    fetchUsers();
  }, [trigger]);

  function refresh() {
    setTrigger((prev) => prev + 1);
  }

  return (
    <div>
      <div className='grid grid-cols-[2fr_1fr_1fr_1fr] items-center my-1 p-1 border-b font-bold'>
        <div>UUID</div>
        <div>Username</div>
        <div>Nickname</div>
        <div>Role</div>
      </div>
      {users.map((user) => (
        <AccountInfo key={user.id} user={user} refresh={refresh} />
      ))}
    </div>
  );
}

function AccountInfo({ user, refresh }) {
  const { token } = useAuthContext();
  const [expand, setExpand] = useState(false);
  const methods = useForm();

  function expandInfo() {
    setExpand(!expand);
  }

  async function changeRole() {
    try {
      await changeUserRole(token, user.id, {
        role: user.role === "ADMIN" ? "USER" : "ADMIN",
      });
      toast.success(
        `${user.nickname}'s role was changed to ${
          user.role === "ADMIN" ? "USER" : "ADMIN"
        }`
      );
      refresh();
    } catch (err) {
      errorHandler(err);
    }
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await updateNickname(token, user.id, data);
      toast.success(
        `${user.nickname}'s nickname was updated to ${data.nickname}`
      );
      refresh();
    } catch (err) {
      errorHandler(err);
    }
  });

  async function deleteUserById() {
    try {
      await deleteUser(token, user.id);
      toast.success(`${user.nickname}'s account was deleted.`);
      refresh();
    } catch (err) {
      errorHandler(err);
    }
  }
  return (
    <div>
      <div
        className='grid grid-cols-[2fr_1fr_1fr_1fr] items-center my-1 bg-white p-1 shadow-sm cursor-pointer'
        onClick={expandInfo}
      >
        <div>{user.id}</div>
        <div>{user.username}</div>
        <div>{user.nickname}</div>
        <div className='flex'>
          {user.role}
          <div className='text-2xl'>
            {expand ? <RxTriangleUp /> : <RxTriangleDown />}
          </div>
        </div>
      </div>
      {expand && (
        <div className='grid grid-cols-2 bg-white shadow-sm p-5'>
          <div>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <div className='flex flex-col'>
                  <Input {...nickname_validation} />
                  <Button text='Update Name' />
                </div>
              </form>
            </FormProvider>
          </div>
          <div className='flex flex-col'>
            <Button
              onClick={changeRole}
              text={user.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
            />
            <Button onClick={deleteUserById} text='Delete User' />
          </div>
        </div>
      )}
    </div>
  );
}
