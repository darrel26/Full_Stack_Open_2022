const _ = require('lodash');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map((content) => content.likes).reduce((prev, curr) => prev + curr);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((content) => content.likes));
  const blogWithMostLikes = blogs.filter(
    (content) => content.likes === maxLikes
  );

  delete blogWithMostLikes[0]._id;
  delete blogWithMostLikes[0].__v;
  delete blogWithMostLikes[0].url;

  return blogWithMostLikes;
};

const authorGroup = (blogs) => {
  return _.uniqBy(_.max(_.map(_.groupBy(blogs, 'author'))), 'author').map(
    (blog) => ({
      author: blog.author,
      blogs: _.max(_.map(_.countBy(blogs, 'author'))),
    })
  );
};

const likesGroup = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes'),
    }))
    .maxBy('likes');
};

const blogInDatabase = async () => {
  const blogList = await Blog.find({});
  return blogList.map((blog) => blog.toJSON());
};

const userInDatabase = async () => {
  const userList = await User.find({});
  return userList.map((user) => user.toJSON());
};

module.exports = {
  blogs,
  authorGroup,
  totalLikes,
  likesGroup,
  favoriteBlog,
  blogInDatabase,
  userInDatabase,
};
