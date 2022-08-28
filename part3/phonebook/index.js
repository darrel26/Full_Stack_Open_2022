const express = require('express');
const app = express();
const services = require('./services');
const cors = require('cors');

const morgan = require('morgan');

app.use(express.json());

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(morgan(':method :url :status :response-time ms :body'));
app.use('/', services);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
