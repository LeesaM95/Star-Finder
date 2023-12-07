// STEP ONE: DEFINE VARIABLES
var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");
var srchBtn = document.getElementById("btn");
var inputVal = document.getElementById("submitInput");
$wgCrossSiteAJAXdomains = [
    '*'
];

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
    origin: 'https://en.wikipedia.org',
    action: "opensearch",
    search: " ",
    namespace: 0,
    limit: 2,
    profile: "normal",
    redirects: "return",
    format: "json",
};


// 0.description, 0.excerpt, 0.id,

// STEP TWO: SET UP SEARCH FUNCTIONS
// TWO A: DEFINE SEARCH FUNCTION FOR WIKIPEDIA
function wikiSearch() {
    // event.preventDefault();
    wikiData.text = inputVal.value
    var wikiParameters = new URLSearchParams(wikiData);
    var wikiUrl = `https://en.wikipedia.org/w/rest.php${wikiParameters}`;
    

    fetch(wikiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for (var i = 0; i < data.pages.length; i++) {
                // creating styling for photo to sit nicely within the code
                console.log(data.pages[i].id);
                var contentTg = document.createElement('<p>');
                var wikiDesc = data.pages[i].description;
                var id = data.pages[i].id;
                var wikiExc = data.pages[i].excerpt;

                contentTg.innerHTML = wikiExc;

                featuredStar.appendChild(contentTg);
            }
        })
}

// TWO B: DEFINE SEARCH FUNCTION FOR FLICKR
function flickrImgSearch() {
    // event.preventDefault();
    flickrData.text = inputVal.value
    var flickrParameters = new URLSearchParams(flickrData);
    var flickrUrl = `https://api.flickr.com/services/rest/?${flickrParameters}`;
    fetch(flickrUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            
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

srchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    flickrImgSearch();
    wikiSearch();
});
// // FOR FLICKR //

// var testUrl = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=jupiter&limit=1"
// fetch(testUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })
//     console.log(data);