const router = require('express').Router();
const Persons = require('../models/contact');

router.get('/', async (request, response) => {
  const persons = await Persons.find({});
  response.json(persons);
});

router.get('/:id', async (request, response, next) => {
  const persons = await Persons.findById(request.params.id);
  if (persons) {
    response.json(persons);
  } else {
    response.status(404).end();
  }
});

router.get('/v1/info', async (request, response) => {
  const contacts = await Persons.find({});

  const body = `<p>Phonebook has info for ${
    contacts.length
  } people</p><p>${new Date()}</p>`;

  response.send(body);
});

router.post('/', async (request, response, next) => {
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

  const savedPerson = await person.save();
  response.status(201).json(savedPerson);
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

router.delete('/:id', async (request, response, next) => {
  await Persons.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
