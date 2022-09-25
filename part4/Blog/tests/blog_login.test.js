const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const helper = require('../utils/test_helper');

const Blog = require('../models/blog');
const User = require('../models/user');

const app = require('../app');
const api = supertest(app);

describe('Blog', () => {
  let token;

  beforeAll(async () => {
    const { username, name, password } = helper.initialUser[0];

    await User.deleteMany({});

    await api
      .post('/api/users')
      .send(helper.initialUser[0])
      .expect(201)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/login')
      .send({ username, password })
      .expect((res) => {
        {
          token = res.body.token;
        }
      });
  });

  describe('As an ops,', () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      console.log('all items are deleted!');

      for (let i of helper.blogs) {
        await api
          .post('/api/v1/blog-list')
          .set('Authorization', `Bearer ${token}`)
          .send(i);
      }
    });

    test('I can create a new blog', async () => {
      const blogsAtStart = await helper.blogInDatabase();

      await api
        .post('/api/v1/blog-list')
        .set('Authorization', `Bearer ${token}`)
        .send(helper.newBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogInDatabase();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

      const blogToView = blogsAtEnd[blogsAtStart.length];
      expect(blogToView.title).toBe(helper.newBlog[0].title);
      expect(blogToView.author).toBe(helper.newBlog[0].author);
      expect(blogToView.url).toBe(helper.newBlog[0].url);
    });

    test('I can create a new blog without likes properties, default value will be set to 0', async () => {
      await api
        .post('/api/v1/blog-list')
        .set('Authorization', `Bearer ${token}`)
        .send(helper.newBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogAtEnd = await helper.blogInDatabase();
      expect(blogAtEnd).toHaveLength(helper.blogs.length + 1);

      expect(blogAtEnd[helper.blogs.length].likes).toBe(0);
    });

    test('I will get response code 400, if the title and url properties are missing from the request data', async () => {
      const newBlog = {
        title: 'A review of the IBM 1620 Data Processing System',
        likes: 10,
      };

      await api
        .post('/api/v1/blog-list')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400);
    });

    test("I can't create a new blog with invalid token", async () => {
      await api.post('/api/v1/blog-list').send(helper.newBlog[0]).expect(401);
      const blogsAtEnd = await helper.blogInDatabase();
      expect(blogsAtEnd).toHaveLength(helper.blogs.length);
    });

    test('I can delete an existing blog', async () => {
      const blogsAtStart = await helper.blogInDatabase();
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

      await api
        .delete(`/api/v1/blog-list/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogInDatabase();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });
});
