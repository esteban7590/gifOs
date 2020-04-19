let gifPositions = ["pos1", "pos2", "pos3", "pos4"];
let idsArray = ["gif-heading1", "gif-heading2", "gif-heading3", "gif-heading4"];
let termsArray = ["Oh boy", "Shit", "Yeah", "Damn"];
termsArray.sort((a, b) => 0.5 - Math.random());

let loadSuggestedGifs = () => {
  termsArray.forEach(async (element, index) => {
    let searchUrl = SEARCH + element;
    let gif = await createGifObjectsArray(searchUrl);
    let img = document.getElementById(gifPositions[index]);
    img.setAttribute("src", gif[index].url);
    img.setAttribute("alt", gif[index].title);
    let hashtag = document.getElementById(idsArray[index]);
    hashtag.innerHTML = "#" + termsArray[index];
    return termsArray;
  });
};

//search on ver mas button click
let searchButton1 = document.getElementById("more-button1");
let searchButton2 = document.getElementById("more-button2");
let searchButton3 = document.getElementById("more-button3");
let searchButton4 = document.getElementById("more-button4");

let searchArray = [searchButton1, searchButton2, searchButton3, searchButton4];

searchArray.forEach((element, index) => {
  element.onclick = () => {
    loadSection(SEARCH + termsArray[index], "result-gifs-container");
    sessionSearches.unshift(termsArray[index]);
    sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
    document.getElementById("results-intro").innerHTML =
      "Resultados: (" + termsArray[index] + ")";
    let resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView();
    loadRecentSearches();
  };
});
