const listHelper = require('../utils/list_helper').totalLikes;
const blogs = require('../utils/list_helper').blogs;

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyBlogs = [];
    const result = listHelper(emptyBlogs);

    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper(listWithOneBlog);

    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper(blogs);

    expect(result).toBe(36);
  });
});
