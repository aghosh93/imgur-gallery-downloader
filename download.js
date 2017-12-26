// if (process.argv.length !== 3) {
//   console.log('usage: ' +
//     process.argv[0].substring(process.argv[0].lastIndexOf('/') + 1) + ' '+
//       process.argv[1].substring(process.argv[1].lastIndexOf('/') + 1) +  'albumHash');
//   process.exit(1);
// }

var fse = require('fs-extra')
var rp = require('request-promise-native')

var imgurLib = require('imgur')
var imgur = imgurLib('3ad07fad0767db0')

function getImagesFromImgur (albumHash) {
  return imgur.album.get(albumHash)
    .then((response) => {
      return JSON.parse(response.text).data.images
    })
}

function downloadAlbum (albumHash) {
  console.log('downloading album: ' + albumHash)
  return fse.mkdir('images/' + albumHash)
    .then(() => {
      return getImagesFromImgur(albumHash)
        .then((imgurImages) => {
          return imgurImages.reduce((sequence, imgurImage) => {
            return sequence.then(() => {
              let filename = 'images/' + albumHash + '/' +
                imgurImage.link.substring(imgurImage.link.lastIndexOf('/') + 1)
              console.log('downloading image: ' + filename)
              // request.get(imgurImage.link).pipe(fs.createWriteStream(filename));
              return rp.get({uri: imgurImage.link, encoding: null})
                .then((data) => {
                  fse.writeFile(filename, data, 'binary')
                })
            })
          }, Promise.resolve())
        })
    })
}

function download () {
  fse.readFile('albumHashes.json')
    .then((data) => {
      let albumHashes = JSON.parse(data).albumHashes
      return albumHashes.reduce((sequence, albumHash) => {
        return sequence.then(() => {
          return downloadAlbum(albumHash)
        })
      }, Promise.resolve())
    }).catch(console.error)
}

// downloadAlbum('89Jy5');
download()
