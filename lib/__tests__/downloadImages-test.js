jest.unmock('../downloadImages');
let mockImageBytes = 'This is a mock of an images in bytes';
jest.mock('request-promise-native', function () {
  return jest.fn(() => Promise.resolve(mockImageBytes));
});

let fs = require('fs-extra');
let path = require('path');
let rp = require('request-promise-native');
let typeToExt = jest.fn(require('../../util/typeToExt'));
jest.setMock('../../util/typeToExt.js', typeToExt);
let downloadImages = require('../downloadImages');

let join = path.join;

describe('testing downloadImages.js', function () {
  beforeAll(function () {
    path.join = jest.fn(join);
    fs.writeFile = jest.fn(() => Promise.resolve());
  });
  test('should create promise chain of downloading images', function () {
    const mockLinks = {
      id: 'DdbTI',
      images: [
        {
          id: 'EjKbFnp',
          link: 'https://i.imgur.com/EjKbFnp.jpg',
          type: 'image/jpeg'
        },
        {
          id: 'CQQD5Kl',
          link: 'https://i.imgur.com/CQQD5Kl.jpg',
          type: 'image/jpeg'
        }
      ]
    };
    expect.assertions(13);
    return downloadImages(mockLinks)
    .then(function () {
      expect(rp).toHaveBeenCalledWith({
        'uri': 'https://i.imgur.com/EjKbFnp.jpg',
        'method': 'GET',
        'encoding': null
      });
      expect(rp).toHaveBeenCalledWith({
        'uri': 'https://i.imgur.com/CQQD5Kl.jpg',
        'method': 'GET',
        'encoding': null
      });
      expect(typeToExt.mock.calls).toHaveLength(2);
      expect(typeToExt.mock.calls[0][0]).toBe('image/jpeg');
      expect(typeToExt.mock.calls[1][0]).toBe('image/jpeg');
      expect(path.join.mock.calls).toHaveLength(2);
      expect(path.join.mock.calls[0].join('/')).toBe('images/DdbTI/EjKbFnp.jpg');
      expect(path.join.mock.calls[1].join('/')).toBe('images/DdbTI/CQQD5Kl.jpg');
      expect(fs.writeFile.mock.calls).toHaveLength(2);
      expect(fs.writeFile.mock.calls[0][0]).toBe(path.join.mock.calls[0].join('/'));
      expect(fs.writeFile.mock.calls[0][1]).toBe(mockImageBytes);
      expect(fs.writeFile.mock.calls[1][0]).toBe(path.join.mock.calls[1].join('/'));
      expect(fs.writeFile.mock.calls[1][1]).toBe(mockImageBytes);
    });
  });
  afterAll(function () {
    path.join = join;
  });
});
