var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");
var srchBtn = document.getElementById("btn");
var inputVal = document.getElementById("submitInput");

var apiKeyFlickr = 'c4aaaedd99b8d8b5a0ee032443cea286';
var flickrData = {
var srchBtn = document.getElementById("btn");
var inputVal = document.getElementById("submitInput");

var apiKeyFlickr = 'c4aaaedd99b8d8b5a0ee032443cea286';
var flickrData = {
    method: 'flickr.photos.search',
    api_key: apiKeyFlickr,
    text: " ", // Search Text
    content_types: 0,
    privacy_filter: 1,
    geo_context: 2,
    per_page: 1,
    per_page: 1,
    extras: 'owner_name,license',
    format: 'json',
    nojsoncallback: 1,
};


var apiKeyWiki = 'fd4bfdb503018e4083550a93176323b0'
var wikiData = {
    origin: "*",
    action: "query",
    srsearch: " ",
    list: "search",
    format: "json",
};

// STEP TWO: SET UP SEARCH FUNCTIONS
// TWO A: DEFINE SEARCH FUNCTION FOR WIKIPEDIA
function wikiSearch() {
    wikiData.srsearch = inputVal.value
    var wikiParameters = new URLSearchParams(wikiData);
    var wikiUrl = `https://en.wikipedia.org/w/api.php?${wikiParameters}`;
    

    fetch(wikiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            featuredStar.innerHTML = "";
            for (var i = 0; i < data.query.search.length; i++) {
                // creating styling for photo to sit nicely within the code
                
                var contentTg = document.createElement('p');
                contentTg.style ="color:white"
                var wikiDesc = data.query.search[i].snippet;
                
                contentTg.innerHTML = wikiDesc;

                featuredStar.appendChild(contentTg);
            }
 
        })
}
// FOR WIKI END //

// TWO B: DEFINE SEARCH FUNCTION FOR FLICKR
function flickrImgSearch() {
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
                var imgDiv = document.createElement('div');

                imgDiv.setAttribute("class", "is-half is-justify-content-center m-3" , "style", "max-width: ")

                var serverid = data.photos.photo[i].server;
                var id = data.photos.photo[i].id;
                var secret = data.photos.photo[i].secret;

                imgTag.src = `https://live.staticflickr.com/${serverid}/${id}_${secret}.jpg`;

                featuredStar.appendChild(imgTag);
                featuredStar.appendChild(imgDiv);
            }
        });
}

srchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    flickrImgSearch();
    wikiSearch();
});
// // FOR FLICKR END //


// STEP THREE: LOCAL STORAGE 
 
// set up local storage for stored  searches 

// if there are no recent searches, have a pop up window display as such when recent search is clicked 

// if there are logged searches, when a user clicks on recent search