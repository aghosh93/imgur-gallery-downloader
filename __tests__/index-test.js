jest.unmock('../index')
const downloader = require('../index')

describe('should throw exception when downloader called with', function () {
  let expectedError = new TypeError('Please call download with a string or Array of strings.')

  test('no inputs', () => {
    expect.assertions(1)
    return expect(downloader.download()).rejects.toEqual(expectedError)
  })

  test('an object not an array', () => {
    expect.assertions(1)
    return expect(downloader.download({})).rejects.toEqual(expectedError)
  })

  test('an empty Array', () => {
    expect.assertions(1)
    return expect(downloader.download([])).rejects.toEqual(expectedError)
  })

  test('an Array with non-strings', () => {
    expect.assertions(1)
    return expect(downloader.download([{}])).rejects.toEqual(expectedError)
  })
})
