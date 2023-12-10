var searchBar = document.getElementById("search-bar");
var featuredStar = document.getElementById("featured-star");
var srchBtn = document.getElementById("btn");
var inputVal = document.getElementById("submitInput");

function saveToLocalStorage() {
  const searchTerm = inputVal.value;
  localStorage.setItem('searchTerm', searchTerm);
  console.log(searchTerm)
}

function getFromLocalStorage() {
  return localStorage.getItem('searchTerm') || '';
  console.log(searchTerm)
}

getFromLocalStorage()

document.getElementById('search-previous').value = getFromLocalStorage();


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
    extras: 'owner_name,license',
    format: 'json',
    nojsoncallback: 1,
};

  const parameters = new URLSearchParams(data);

<<<<<<< HEAD
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
                var contentTg = document.createElement('p');
                var moreInfo = document.createElement('p');
                var wikiLink = document.createElement('a');
                
                var wikiDesc = data.query.search[0].snippet;
                var wikiPageId = data.query.search[0].pageid;
                
                contentTg.setAttribute("style", 
                "float: right; font-family: monospace; font-size: 12.5px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px")
                moreInfo.setAttribute("style", "float: right; font-family: monospace; font-size: 14px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px;")
                wikiLink.setAttribute("href", wikiUrl + wikiPageId, "style", "float: right; font-family: monospace; font-size: 14px; text-align: justify; color: #fff;  margin: 30px; max-width: 538px;");


                moreInfo.textContent = "If you'd like to learn more, please click the link " + wikiLink + "!";
                contentTg.innerHTML = wikiDesc + " ...";

                featuredStar.appendChild(contentTg);
                featuredStar.appendChild(moreInfo);
                featuredStar.appendChild(wikiLink);
            
 
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
    saveToLocalStorage();
});
// // FOR FLICKR END //
=======
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  console.log(url);
>>>>>>> 83a40fd1ab96c63e66914dcdf8b6d901600e5f55



<<<<<<< HEAD
// if there are no recent searches, have a pop up window display as such when recent search is clicked 

// if there are logged searches, when a user clicks on recent search
=======
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
>>>>>>> 83a40fd1ab96c63e66914dcdf8b6d901600e5f55
