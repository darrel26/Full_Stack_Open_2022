const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../app');
const supertest = require('supertest');
const helper = require('../utils/test_helper');

const User = require('../models/user');
const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('admin', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.userInDatabase();

    const newUser = {
      username: 'darrelgunadi',
      name: 'Dionisius Darrel',
      password: 'diondarrel',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.userInDatabase();
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const newUsername = usersAtEnd.map((user) => user.username);
    expect(newUsername).toContain(newUser.username);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
