const router = require('express').Router();
const blogContents = require('../models/blog');

router.get('/blog-list', (req, res) => {
  blogContents.find({}).then((content) => {
    res.json(content);
  });
});

router.get('/blog-list/:id', (req, res, next) => {
  blogContents
    .findById(req.params.id)
    .then((content) => {
      if (content) {
        res.json(content);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.post('/blog-list', (req, res) => {
  const blog = new blogContents(req.body);

  blog.save().then((result) => res.status(201).json(result));
});

module.exports = router;
