const albumImages = require('./lib/albumImages');
const directories = require('./lib/directories');
const downloadImages = require('./lib/downloadImages');

let program = require('commander');
program
  .usage('<hashes...>')
  .parse(process.argv);

console.log(program.args);
if (program.args.length === 0) { program.help(); }

Promise.resolve().then(program.args.reduce(function (chain, hash) {
  return chain
    .then(() => directories.mkDirs(hash))
    .then(() => albumImages(hash))
    .then(downloadImages);
}, Promise.resolve()));
