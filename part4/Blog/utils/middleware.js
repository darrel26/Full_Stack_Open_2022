const requestLogger = (req, res, next) => {
  console.log(`Accessed date    : ${new Date().toLocaleDateString()}`);
  console.log(`Method           : ${req.method}`);
  console.log(`Path             : ${req.path}`);
  console.log(`Body             : ${JSON.stringify(req.body)}`);
  console.log(`Status Code      : ${res.statusCode}`);
  console.log('-----');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
