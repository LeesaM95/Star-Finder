// STEP ONE: DEFINE VARIABLES
var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");
var srchBtn = document.getElementById("search-button");

var apiKeyFlickr = 'c4aaaedd99b8d8b5a0ee032443cea286';
var flickrData = {
  method: 'flickr.photos.search',
  api_key: apiKeyFlickr,
  text: ' ', // Search Text
  content_types: 0,
  geo_context: 2,
  per_page: 3,
  extras: 'owner_name,license',
  format: 'json',
  nojsoncallback: 1,
};
var flickrParameters = new URLSearchParams(flickrData);
var flickrUrl = `https://api.flickr.com/services/rest/?${flickrParameters}`;

var apiKeyWiki = 'fd4bfdb503018e4083550a93176323b0'
var wikiData = {
    language_code: 'en',
    action: 'query',
    list: 'search',
    srsearch: ' ',
    format: 'json',
    number_of_results: 1,
    base_Url: 'https://api.wikimedia.org/core/v1/wikipedia/',
    endpoint: '/search/page',
    
};

var wikiParameters = new URLSearchParams(wikiData);
var wikiUrl = `http://en.wikipedia.org/w/api.php${wikiParameters}`;



// STEP TWO: SET UP SEARCH FUNCTIONS
// TWO A: DEFINE SEARCH FUNCTION FOR WIKIPEDIA
// fetch(wikiUrl) 
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     // We will impliment something later...
//   });


// TWO B: DEFINE SEARCH FUNCTION FOR FLICKR
fetch(flickrUrl) 
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // We will impliment something later...
    
            
  });

//   const getFlickrImageURL = (photo, size) => {
//     let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
//       photo.secret
//     }`;
//     if (size) {
//       // Configure image size
//       url += `_${size}`;
//     }
//     url += '.jpg';
//     return url;
//   };
  
//   axios.get(url)
//     .then(response => response.json())
//     .then(data => (
//       // get an array of image-url
//       data.photos.photo.map((photo) => {
//         return getFlickrImageURL(photo, 'q');
//       })
//     ));

// // FOR FLICKR //
