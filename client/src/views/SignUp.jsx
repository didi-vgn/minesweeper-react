export default function SignUp() {
  return (
    <div>
      <h3>Sign up</h3>
      <form action=''>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='nickname'>Nickname:</label>
        <input type='text' name='nickname' id='nickname' required />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' />
        <label htmlFor='confirmPassword'>Confirm password:</label>
        <input type='password' name='confirmPassword' id='confirmPassword' />
        <button>Sign up</button>
      </form>
    </div>
  );
}
