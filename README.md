# Imgur Gallery Downloader
-----
This is a help package to download imgur albums.

The motivation to create this was because I wanted to download a bunch of wallpaper dumps with out manually downloading and unzipping a crap load.

You can download a single or multiple albums from imgur in the same time.

As of right now it will download each image sequentially. If it were to try to download them simultanousely either the imgur API would stop us or we run out of free ports on our computer. Also not very good for your internet bandwidth.

Install:

```
npm install --save git+https://github.comaghosh93/imgur-gallery-downloader.git
```

Usage:

file.js
```
const downloader = require('imgur-gallery-downloader');

downloader.download('/*Some hash*/');
```

console
```
$ node file.js
```

For multiple imgur album hashes
```
const downloader = require('imgur-gallery-downloader');

downloader.download(['/*Some hash*/', /*Another hash*/]);
```
