#!/usr/bin/env node

const albumImages = require('../lib/albumImages');
const directories = require('../lib/directories');
const downloadImages = require('../lib/downloadImages');

let program = require('commander');
program
  .usage('<hashes...>')
  .parse(process.argv);

if (program.args.length === 0) { program.help(); }

Promise.resolve().then(program.args.reduce(function (chain, hash) {
  return chain
    .then(() => directories.mkDirs(hash))
    .then(() => albumImages(hash))
    .then(downloadImages)
    .catch(() => {
      console.error(`An Error has occured with album hash: ${hash}`);
      return Promise.resolve(); // Needed to continue the promise chain.
    });
}, Promise.resolve()));
