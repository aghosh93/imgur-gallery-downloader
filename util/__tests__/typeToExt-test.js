jest.unmock('../typeToExt');
const typeToExt = require('../typeToExt');

describe('testing typeToExt.js', function () {
  test('should return correct extenstion', function () {
    expect(typeToExt('image/jpeg')).toBe('.jpg');
    expect(typeToExt('image/png')).toBe('.png');
  });
  test('should return undefined with passed unsupported type', function () {
    expect(typeToExt('unsupported type')).toBeUndefined();
  });
});
