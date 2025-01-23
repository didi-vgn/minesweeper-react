import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this page does not exist!</h1>
      <Link to='/'>Go back to main page</Link>
    </div>
  );
}
