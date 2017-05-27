jest.unmock('../index');
const downloader = require('../index');

describe('should throw exception when downloader called with', function() {
  let expectedError = new TypeError('Please call download with a string or Array of strings.');
  test('no inputs', function() {
    expect.assertions(1);
    return expect(downloader.download()).rejects.toEqual(expectedError);
  });
  test('bad inputs', function() {
    expect.assertions(1);
    return expect(downloader.download({})).rejects.toEqual(expectedError);
  });
})
