module.exports = function (type) {
  if (type === 'image/jpeg') {
    return '.jpg';
  } else if (type === 'image/png') {
    return '.png';
  } else {
    return undefined;
  }
};
