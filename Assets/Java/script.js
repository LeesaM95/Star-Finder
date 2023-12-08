var constEl = document.getElementById("constellation-details")
var bannerEl = document.getElementById("banner")
var searchBtn = document.getElementById("search-btn")
constEl.style.display="none"

searchBtn.addEventListener("click",function(event){
    event.preventDefault()
    constEl.style.display="block"
    bannerEl.style.display="none"
})