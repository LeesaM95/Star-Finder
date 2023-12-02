// STEP ONE: DEFINE VARIABLES
var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");

// STEP TWO: SET UP SEARCH FUNCTIONS
// TWO A: DEFINE SEARCH FUNCTION FOR WIKIPEDIA
// TWO B: DEFINE SEARCH FUNCTION FOR FLICKR

// STEP THREE: 












// // FOR FLICKR //
const yourApiKey = 'c4aaaedd99b8d8b5a0ee032443cea286';

const apiUrl = 'https://api.flickr.com/services/rest/';

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



fetch(url) 
  .then(response => response.json())
  .then(data => {    
    const photos = data.photos.photo;

    featuredStar.innerHTML = ''

    photos.forEach(photo => {
      const img = document.createElement('img');
      img.src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      img.alt = photo.title;
      featuredStar.appendChild(img);
    })
    console.log(data);
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

// // FOR WIKIPEDIA //
// var xhr = new XMLHttpRequest();

// // Open a new connection, using the GET request on the URL endpoint
// // Providing 3 arguments (GET/POST, The URL, Async True/False)
// xhr.open('GET', url, true);
// // Once request has loaded...
// xhr.onload = function() {
//     // Parse the request into JSON
//     var wikiData = JSON.parse(this.response);

//     // Log the data object
//     console.log(wikiData);

// //     // Log the page objects
// //     console.log(data.query.pages)

// //     // Loop through the data object
// //     // Pulling out the titles of each page
// //     for (var i in data.query.pages) {
// //         console.log(data.query.pages[i].title);
// //     }
// // }
// // Send request to the server
// xhr.send();