const listHelper = require('../utils/list_helper');
const blogs = require('../utils/list_helper').blogs;

describe('favorite blog', () => {
  test('with most likes', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    const result = listHelper.favoriteBlog(blogs);

    expect(...result).toEqual(expected);
  });

  test('author with most blogs', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    const result = listHelper.authorGroup(blogs);

    expect(...result).toEqual(expected);
  });

  test('author with most likes in total', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    const result = listHelper.likesGroup(blogs);

    expect(result).toEqual(expected);
  });
});