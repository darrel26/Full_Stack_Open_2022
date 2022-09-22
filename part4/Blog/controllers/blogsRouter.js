const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

router.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const users = await User.findById(decodedToken.id);

  if (req.body === undefined) {
    return res.status(400).json({ error: 'Content missing!' });
  }

  if (!req.body.author) {
    return res.status(400).json({
      error: 'Please enter blog author!',
    });
  } else if (!req.body.url) {
    return res.status(400).json({
      error: 'Please enter blog url!',
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: users._id,
  });

  const savedBlog = await blog.save();
  users.blogs = users.blogs.concat(savedBlog._id);
  await users.save();

  res.status(201).json(savedBlog);
});

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;

  const updateBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  );

  res.status(200).json(updateBlog);
});

module.exports = router;
