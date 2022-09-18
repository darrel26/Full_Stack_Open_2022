const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
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

router.post('/', async (req, res) => {
  const blog = new Blog(req.body);

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

  const savedBlog = await blog.save();
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
