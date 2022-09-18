const _ = require('lodash');
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
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

module.exports = {
  blogs,
  authorGroup,
  totalLikes,
  likesGroup,
  favoriteBlog,
};
