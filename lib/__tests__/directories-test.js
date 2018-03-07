jest.unmock('../directories');
let directories = require('../directories');
const fs = require('fs-extra');
const path = require('path');

describe('testing directores.js', function () {
  let join = path.join;
  let mkdir = fs.mkdir;
  describe('mkDirs', function () {
    let testAlbumHash = 'js9sJ';
    beforeEach(function () {
      path.join = jest.fn(join);
      fs.mkdir = jest.fn(() => Promise.resolve());
    });

    test('should be creating folders when they do not exists', function () {
      expect.assertions(6);

      return directories.mkDirs(testAlbumHash).then(function () {
        expect(path.join.mock.calls).toHaveLength(2);
        expect(path.join.mock.calls[0].join('/')).toBe('images');
        expect(path.join.mock.calls[1].join('/')).toBe(`images/${testAlbumHash}`);
        expect(fs.mkdir.mock.calls).toHaveLength(2);
        expect(fs.mkdir.mock.calls[0][0]).toBe('images');
        expect(fs.mkdir.mock.calls[1][0]).toBe(`images/${testAlbumHash}`);
      });
    });

    test('should not create folders when they do exists', function () {
      let mockFsError = {
        code: 'EEXIST'
      };

      fs.mkdir = jest.fn(() => Promise.reject(mockFsError));
      expect.assertions(6);

      return directories.mkDirs(testAlbumHash).then(function () {
        expect(path.join.mock.calls).toHaveLength(2);
        expect(path.join.mock.calls[0].join('/')).toBe('images');
        expect(path.join.mock.calls[1].join('/')).toBe(`images/${testAlbumHash}`);
        expect(fs.mkdir.mock.calls).toHaveLength(2);
        expect(fs.mkdir.mock.calls[0][0]).toBe('images');
        expect(fs.mkdir.mock.calls[1][0]).toBe(`images/${testAlbumHash}`);
      });
    });
    test('should fail if error is not expectd from fs.mkdir', function () {
      let mockFsError = {
        code: 'Some other code'
      };

      fs.mkdir = jest.fn(() => Promise.reject(mockFsError));
      expect.assertions(1);

      return directories.mkDirs(testAlbumHash)
      .catch(function (error) {
        expect(error).toBeDefined();
      });
    });
  });
  afterAll(function () {
    // had to replace it after the tests are done.
    path.join = join;
    fs.mkdir = mkdir;
  });
});
