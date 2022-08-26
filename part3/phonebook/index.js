const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  const body = `<p>Phonebook has info for ${
    persons.length
  } people</p><p>${new Date()}</p>`;
  response.send(body);
});

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const findDuplicates = (entries) => {
  return persons.filter((person) =>
    person.name.toLowerCase().includes(entries.toLowerCase())
  );
};

app.post('/api/persons/', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'please enter contact name',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'please enter contact number',
    });
  } else if (findDuplicates(body.name).length > 0) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: Number(body.number),
  };

  persons = persons.concat(person);

  response.json(persons);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const personIndex = persons.findIndex((person) => person.id === id);

  if (persons[personIndex]) {
    persons.splice(personIndex, 1);
    response.send(`Deleted`);
  } else {
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
