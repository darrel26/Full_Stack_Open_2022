const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/for_testing');

const Persons = require('../models/contact');
const api = supertest(app);

beforeEach(async () => {
  await Persons.deleteMany({});

  let personObject = new Persons(helper.initialContact[0]);
  await personObject.save();

  personObject = new Persons(helper.initialContact[1]);
  await personObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all notes are returned', async () => {
  const response = await api.get('/api/persons');

  expect(response.body).toHaveLength(helper.initialContact.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/persons');

  const contents = response.body.map((person) => person.name);
  expect(contents).toContain('Floryn');
});

test('a valid contact can be added', async () => {
  const newContact = {
    name: 'Nicki Minaj',
    number: '696-1261266',
  };

  await api
    .post('/api/persons')
    .send(newContact)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const personsAtEnd = await helper.personsInDatabase();
  expect(personsAtEnd).toHaveLength(helper.initialContact.length + 1);

  const contacts = personsAtEnd.map((person) => person.name);
  expect(contacts).toContain(newContact.name);
});

test('contact without name is not added', async () => {
  const newContact = {
    number: '699-1261266',
  };

  await api.post('/api/persons').send(newContact).expect(400);

  const personsAtEnd = await helper.personsInDatabase();

  expect(personsAtEnd).toHaveLength(helper.initialContact.length);
});

test('a specific persons can be viewed', async () => {
  const personsAtStart = await helper.personsInDatabase();

  const personToView = personsAtStart[0];

  const result = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedPersonToView = JSON.parse(JSON.stringify(personToView));

  expect(result.body).toEqual(processedPersonToView);
});

test('a person in contacts can be deleted', async () => {
  const personsAtStart = await helper.personsInDatabase();
  const personToDelete = personsAtStart[0];

  await api.delete(`/api/persons/${personToDelete.id}`).expect(204);

  const personsAtEnd = await helper.personsInDatabase();
  expect(personsAtEnd).toHaveLength(helper.initialContact.length - 1);

  const contacts = personsAtEnd.map((person) => person.name);
  expect(contacts).not.toContain(personToDelete.name);
});

afterAll(() => {
  mongoose.connection.close();
});
