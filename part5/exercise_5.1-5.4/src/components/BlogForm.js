const BlogForm = ({ setTitle, setAuthor, setUrl, newBlogHandler }) => {
  return (
    <div>
      <form onSubmit={newBlogHandler}>
        <label for="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <br></br>
        <label for="author">author</label>
        <input
          type="text"
          id="author"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
        <br></br>
        <label for="url">url</label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
        <br></br>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
