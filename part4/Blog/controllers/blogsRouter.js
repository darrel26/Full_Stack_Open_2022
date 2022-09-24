const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

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

router.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await req.user;

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
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

router.delete('/:id', userExtractor, async (req, res) => {
  const user = await req.user;

  const blogToView = await Blog.findById(req.params.id);

  if (!blogToView) {
    return res.status(404).json({ error: 'blog id not found' });
  } else if (blogToView.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'unmatched blog and user' });
  }

  await blogToView.remove();
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
