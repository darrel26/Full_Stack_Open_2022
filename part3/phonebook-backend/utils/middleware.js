const morgan = require('morgan');

const requestLogger = (request, response, next) => {
  console.log('Accessed date  : ', new Date().toLocaleString());
  console.log('Method         :', request.method);
  console.log('Path           :', request.path);
  console.log('Body           :', request.body);
  console.log('Status Code    :', response.statusCode);
  console.log('----------------------------------------');
  next();
};

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { requestLogger, morgan, unknownEndpoint, errorHandler };
