var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");
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
            

                // creating styling for photo to sit nicely within the code
                var contentTg = document.createElement('p'); //snippet from wikipedia
                var wikiDesc = data.query.search[0].snippet;

             
                contentTg.setAttribute("style", 
                "float: right; font-family: monospace; font-size: 28px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px")
    
                contentTg.innerHTML = wikiDesc + " ...";
      
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
$(document).ready(function(){
    loadSavedItems();
  
    $("#btn").click(function(){
        var newItem = inputVal.value;
        if (newItem) {
            saveItem(newItem);
            loadSavedItems();
        }
    });
  
    function saveItem(item) {
    
        var savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
  
        savedItems.push(item);
  
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }
  });
  

