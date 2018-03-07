jest.unmock('../albumImages');
let albumImages = require('../albumImages');
let imgur = require('imgur')();

describe('testing albumImages.js', function () {
  const mockAlbumHash = 'adsfasdf';
  const mockImage1 = {
    id: 'EjKbFnp',
    link: 'https://i.imgur.com/EjKbFnp.jpg',
    type: 'image/jpeg'
  };
  const mockImage2 = {
    id: 'CQQD5Kl',
    link: 'https://i.imgur.com/CQQD5Kl.jpg',
    type: 'image/jpeg'
  };
  test('should be return selected fields of image object', function () {
    expect.assertions(6);
    return albumImages(mockAlbumHash)
      .then(function (links) {
        expect(imgur.gallery.get).toHaveBeenCalledTimes(1);
        expect(imgur.gallery.get).toHaveBeenCalledWith(mockAlbumHash);
        expect(links.id).toBe('DdbTI');
        expect(links.images).toHaveLength(2);
        expect(links.images).toContainEqual(mockImage1);
        expect(links.images).toContainEqual(mockImage2);
      });
  });
});
