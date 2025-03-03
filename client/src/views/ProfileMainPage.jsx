import { useAuthContext } from "../context/AuthContext";

export default function ProfileMainPage() {
  const { user } = useAuthContext();

  if (!user) return;

  return (
    <div className='m-10 text-center text-5xl'>Welcome {user.nickname}!</div>
  );
}
