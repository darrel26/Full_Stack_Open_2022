const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/test_helper');

const Blog = require('../models/blog');
const api = supertest(app);

describe('When there is initially some blog saved', () => {
  test('should return in json format', async () => {
    await api
      .get('/api/v1/blog-list')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('the id property should return as id instead of _id', async () => {
    const response = await api.get('/api/v1/blog-list').expect(200);
    const blogToView = Object.keys(response.body[0]);
    expect(response).toBeDefined();
    expect(blogToView).toContainEqual('id');
  });
});

describe('When update a blog', () => {
  test('success update an existing blog', async () => {
    const updateBlog = {
      title: 'A nice theorem on monotonic predicate sequences',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD818.html',
    };

    const blogAtStart = await helper.blogInDatabase();
    const blogToUpdate = blogAtStart[0];

    await api
      .put(`/api/v1/blog-list/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogInDatabase();
    expect(blogAtEnd).toHaveLength(helper.blogs.length);

    const blogs = blogAtEnd.map((blog) => blog.title);
    expect(blogs).toContain('A nice theorem on monotonic predicate sequences');
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('all items are deleted!');

  const blogObject = helper.blogs.map((blog) => {
    return new Blog(blog);
  });

  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

afterAll(async () => {
  mongoose.connection.close();
});
