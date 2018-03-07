const albumImages = require('./lib/albumImages');
const directories = require('./lib/directories');
const downloadImages = require('./lib/downloadImages');

let hash = 'ONTjY';

Promise.resolve()
.then(() => directories.mkDirs(hash))
.then(() => albumImages(hash))
.then(downloadImages);
