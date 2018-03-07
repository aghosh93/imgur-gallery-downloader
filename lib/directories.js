const fs = require('fs-extra');
const path = require('path');

function createFolder (folderPath) {
  return fs.mkdir(folderPath)
    .then(function () {
      console.log(`Creating directory: ${folderPath}`);
    })
    .catch(function (error) {
      if (error.code !== 'EEXIST') {
        return Promise.reject(error);
      } else {
        console.log(`directory: ${folderPath} already exists`);
      }
    });
}

let directories = {
  mkDirs: function (albumHash) {
    return createFolder(path.join('images'))
      .then(() => createFolder(path.join('images', albumHash)));
  }
};

module.exports = directories;
