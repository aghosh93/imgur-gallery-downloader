const mockGetResponse = jest.fn(function () {
  return Promise.resolve(require('./mockResponses/imgurGalleryGetMock.json'));
});

module.exports = function () {
  return {
    gallery: {
      get: mockGetResponse
    }
  };
};
