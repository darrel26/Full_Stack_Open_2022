const listHelper = require('../utils/test_helper');
const blogs = require('../utils/test_helper').blogs;

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
      author: 'Edsger W. Dijkstra',
      blogs: 2,
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
