import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [url, setUrl] = useState(null);

  const [notification, setNotification] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      blogService.setUserId(user.id);

      setUser(user);
      setUsername('');
      setPassword('');
      setNotification(null);
    } catch (error) {
      setNotification({
        status: 'error',
        message: error.response.data.error,
      });
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs(null);
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();

    const blog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);
      setNotification({
        status: 'success',
        message: `a new blog ${blog.title} by ${blog.author} added`,
      });
    } catch (error) {
      if (error.response.status === 409) {
        console.log(error);
      }
      setNotification({
        status: 'error',
        message: `${error.response.data.error}`,
      });
      console.log(error);
      setNotification({
        status: 'error',
        message: `${error.response.data.error}`,
      });
    }
  };

  useEffect(() => {
    blogService.getAll().then(({ blogs }) => setBlogs(blogs));
  }, [user]);

  useEffect(() => setNotification(null), []);

  const notificationStyle = {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#ECECEC',
    color: 'black',
    fontSize: '24px',
    padding: '20px',
    fontWeight: 'bold',
  };

  const successNotification = (message) => {
    const successStyle = {
      ...notificationStyle,
      border: '1px solid green',
    };

    return <div style={successStyle}>{message}</div>;
  };

  const errorNotification = (message) => {
    const errorStyle = {
      ...notificationStyle,
      border: '1px solid red',
    };

    return <div style={errorStyle}>{message}</div>;
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          {notification !== null
            ? notification.status === 'error'
              ? errorNotification(notification.message)
              : console.log('success logged in')
            : null}
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            loginHandler={handleLogin}
          ></LoginForm>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {notification !== null
            ? notification.status === 'success'
              ? successNotification(notification.message)
              : errorNotification(notification.message)
            : console.log('user has not create new blog yet!')}
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogs.length > 0 && (
            <ul>
              {blogs.map((blogs) => (
                <li key={blogs.id}>{`${blogs.title} - ${blogs.author}`}</li>
              ))}
            </ul>
          )}
          <h2>create new</h2>
          <BlogForm
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            newBlogHandler={handleNewBlog}
          ></BlogForm>
        </div>
      )}
    </div>
  );
};

export default App;
