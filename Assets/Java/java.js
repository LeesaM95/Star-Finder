const yourApiKey = 'c4aaaedd99b8d8b5a0ee032443cea286';

const data = {
  method: 'flickr.photos.search',
  api_key: yourApiKey,
  text: ' ', // Search Text
  sort: 'interestingness-desc',
  per_page: 12,
  license: '4',
  extras: 'owner_name,license',
  format: 'json',
  nojsoncallback: 1,
};

const parameters = new URLSearchParams(data);

const url = `https://api.flickr.com/services/rest/?${parameters}`;
console.log(url);


axios.get(url)
  .then(response => response.json())
  .then(data => {
    // We will impliment something later...
  });

  const getFlickrImageURL = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
      photo.secret
    }`;
    if (size) {
      // Configure image size
      url += `_${size}`;
    }
    url += '.jpg';
    return url;
  };
  
  axios.get(url)
    .then(response => response.json())
    .then(data => (
      // get an array of image-url
      data.photos.photo.map((photo) => {
        return getFlickrImageURL(photo, 'q');
      })
    ));