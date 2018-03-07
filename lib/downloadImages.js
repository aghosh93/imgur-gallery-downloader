let fs = require('fs-extra');
let path = require('path');
let rp = require('request-promise-native');
const typeToExt = require('../util/typeToExt');

module.exports = function (links) {
  return links.images.reduce(function (chain, image) {
    return chain.then(function () {
      let options = {
        'uri': image.link,
        'method': 'GET',
        'encoding': null
      };
      return rp(options)
      .then(function (response) {
        let imagePath = path.join('images', links.id, image.id + typeToExt(image.type));
        console.log(`Saving image: ${imagePath}`);
        return fs.writeFile(imagePath, response);
      });
    });
  }, Promise.resolve());
};
