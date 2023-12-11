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

                // creating styling for photo to sit nicely within the code
                var contentTg = document.createElement('p'); //snippet from wikipedia
                var moreInfo = document.createElement('p'); // for more information 
                var wikiLink = document.createElement('a'); // link to the page on wiki

                var wikiUrl = "href=https://en.wikipedia.org/w/"
                var wikiDesc = data.query.search[0].snippet;
                var wikiPageTitle = data.query.search[0].title;
                var wikiPageString = JSON.stringify(wikiPageTitle) // "Milky(+)Way"
                var stringElement = "+"
                var wikiStringSplit = wikiPageString.split(stringElement);
                var fullwikiUrl = wikiUrl.concat(wikiStringSplit);

                //Trying to create wikiPageTitle into a string, then add stringElement to the string created, and finally concat wikiStringSplit (when it's properly rendered) 
                // to fullwikiUrl to make a full url that will be added to the wikiLink

             
                contentTg.setAttribute("style", 
                "float: right; font-family: monospace; font-size: 28px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px")
                moreInfo.setAttribute("style", "float: right; font-family: monospace; font-size: 14px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px;")
                wikiLink.setAttribute( 
                "style", "float: right; font-family: monospace; font-size: 14px; text-align: justify; color: #fff;  margin: -30px 30px 30px -50%; max-width: 538px;",
                "alt",  "here", );


                moreInfo.textContent = "If you'd like to learn more, please click the link " + fullwikiUrl + "!";
                contentTg.innerHTML = wikiDesc + " ...";
      
            featuredStar.innerHTML = "";
            for (var i = 0; i < data.query.search.length; i++) {
                // creating styling for photo to sit nicely within the code
                
                var contentTg = document.createElement('p');
                contentTg.style ="color:white"
                var wikiDesc = data.query.search[i].snippet;
                
                contentTg.innerHTML = wikiDesc;


                featuredStar.appendChild(contentTg);
                featuredStar.appendChild(moreInfo);
                featuredStar.appendChild(wikiLink, fullwikiUrl);
            
 
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
                

                imgTag.setAttribute("style", "max-width: 538px; flex-direction: column; float:left; margin: 30px -30px 30px 30px;",);

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
// // FOR FLICKR END //


// STEP THREE: LOCAL STORAGE 
 
// set up local storage for stored  searches 

// if there are no recent searches, have a pop up window display as such when recent search is clicked 
// if there are logged searches, when a user clicks on recent search


// STEP FOUR:
// WHEN the user searches for a constellation
// THEN the image and snippet from wikipedia will load on the page
// WHEN the title and subtitle of the main page "Star Finder: Where the stars are at your fingertips", is replaced with the results during the search. 

