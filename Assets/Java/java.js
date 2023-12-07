
var featuredStar = document.getElementById("featured-star");
var srchBtn = document.getElementById("search-btn");
var inputVal = document.getElementById("submitInput");

// be sure all values are instantiated in HTML

console.log(inputVal.value)

var apiKeyFlickr = 'c4aaaedd99b8d8b5a0ee032443cea286';
var flickrData = {
  method: 'flickr.photos.search',
  api_key: apiKeyFlickr,
  text: " ", // Search Text
  content_types: 0,
  privacy_filter: 1,
  geo_context: 2,
  per_page: 3,
  extras: 'owner_name,license',
  format: 'json',
  nojsoncallback: 1,
};


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
function flickrImgSearch(event) {
    event.preventDefault();
    flickrData.text = inputVal.value

    console.log(inputVal.value)

    var flickrParameters = new URLSearchParams(flickrData);
    var flickrUrl = `https://api.flickr.com/services/rest/?${flickrParameters}`;
fetch(flickrUrl) 
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    console.log(data)
    // We will impliment something later...        
    // We want users to be able to input a SEARCH TERM for a star/constellation
    for (var i = 0; i < data.photos.photo.length; i++) {
        // creating styling for photo to sit nicely within the code
        console.log(data.photos.photo[i].id);
        var imgTag = document.createElement('img');
        var serverid = data.photos.photo[i].server;
        var id = data.photos.photo[i].id;
        var secret = data.photos.photo[i].secret;
        
        imgTag.src = `https://live.staticflickr.com/${serverid}/${id}_${secret}.jpg`;

        featuredStar.appendChild(imgTag); 
    }
  });
}

srchBtn.addEventListener('click', flickrImgSearch);
// // FOR FLICKR //