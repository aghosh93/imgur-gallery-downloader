const fse = require('fs-extra');
const rp = require('request-promise-native');
const path = require('path');
const imgurLib = require('imgur');
const imgur = imgurLib('3ad07fad0767db0');

let Downloader = function() {};

function getImagesFromImgur(albumHash) {
  return imgur.album.get(albumHash)
    .then((response) => {
      return JSON.parse(response.text).data.images;
    });
}

function downloadAlbum(albumHash, directory) {
  console.log('downloading album: ' + albumHash);
  return fse.mkdir(directory + albumHash)
    .then(() => {
      return getImagesFromImgur(albumHash)
        .then((imgurImages) => {
          return imgurImages.reduce((sequence, imgurImage) => {
            return sequence.then(() => {
              let filename = path.join(directory, albumHash);
                imgurImage.link.substring(imgurImage.link.lastIndexOf('/') + 1);
              console.log('downloading image: ' + filename);
              return rp.get({uri:imgurImage.link, encoding:null})
              .then((data) => {
                fse.writeFile(filename, data, 'binary');
              });
            });
          }, Promise.resolve());
        });
    });
}

Downloader.prototype.download = function(hashes, options = {}) {
  let directory = '.';
  return new Promise(function(resolve, reject) {
    // if given one hash as a string
    if (typeof hashes === 'string') {
      return downloadAlbum([hashes], directory)
    }

    if (typeof hashes === 'object' && hashes instanceof Array) {
      let nonStrings = hashes.filter((hash) => typeof hash == 'string');
      return downloadAlbum(hashes, directory);
    }

    reject(new TypeError('Please call download with a string or Array of strings.'))
  });
}

module.exports = new Downloader();
