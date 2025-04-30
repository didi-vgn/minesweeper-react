import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";
const BASE_PATH = import.meta.env.BASE_URL;

export default function ForbiddenPage() {
  return (
    <div className='silkscreen text-center text-4xl text-pink-600 m-20'>
      <div className='text-8xl flex justify-center'>
        <TfiFaceSad />
      </div>
      <h1 className='flex justify-center gap-3 items-center my-10'>
        Access deniend. You don't have permissions to view this page.
      </h1>
      <Link to={`${BASE_PATH}/`}>
        <div className='hover:underline cursor-pointer'>
          Go back to main page
        </div>
      </Link>
    </div>
  );
}
