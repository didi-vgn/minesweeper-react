import { Link } from "react-router-dom";
import { TfiFaceSad } from "react-icons/tfi";

export default function ErrorPage() {
  return (
    <div className='text-center text-4xl text-pink-600 m-20'>
      <div className='text-8xl flex justify-center'>
        <TfiFaceSad />
      </div>
      <h1 className='flex justify-center gap-3 items-center my-10'>
        Oh no, this page does not exist!
      </h1>
      <Link to='/'>
        <div className='hover:underline cursor-pointer text-2xl'>
          Go back to main page.
        </div>
      </Link>
    </div>
  );
}
