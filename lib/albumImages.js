let config = require('../config');
const imgur = require('imgur')(config.imgur.client_id);

module.exports = function (albumHash) {
  return imgur.gallery.get(albumHash)
  .then(function (response) {
    let images = response.body.data.images.map((image) => {
      return {
        id: image.id,
        link: image.link,
        type: image.type
      };
    });
    return {
      id: response.body.data.id,
      images
    };
  });
};
