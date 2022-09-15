const router = require('express').Router();
const Persons = require('../models/contact');

router.get('/', (request, response) => {
  Persons.find({}).then((person) => {
    response.json(person);
  });
});

router.get('/:id', (request, response, next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.get('/info', async (request, response) => {
  const phoneBookLength = await Persons.find({}).then(
    (person) => person.length
  );
  const body = `<p>Phonebook has info for ${phoneBookLength} people</p><p>${new Date()}</p>`;

  response.send(body);
});

router.post('/', (request, response, next) => {
  const body = request.body;

  if (body === undefined) {
    return response.status(400).json({ error: 'Content missing!' });
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'Please enter contact name!',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Please enter contact number!',
    });
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

router.put('/:id', (request, response, next) => {
  const { name, number } = request.body;

  return Persons.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

router.delete('/:id', (request, response, next) => {
  return Persons.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = router;
