const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogsRouter');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info(`connected to MongoDB`);
  })
  .catch((error) => {
    logger.error(error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/blog-list', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
