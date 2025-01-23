export default function LogIn() {
  return (
    <div>
      <h3>Log in</h3>
      <form action=''>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' />
        <button>Log in</button>
      </form>
    </div>
  );
}
