const LoginForm = ({ setUsername, setPassword, loginHandler }) => {
  return (
    <div>
      <form onSubmit={loginHandler}>
        <label for="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <br></br>
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <br></br>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
