const gifPositions = ["pos1", "pos2", "pos3", "pos4"];
const idsArray = [
  "gif-heading1",
  "gif-heading2",
  "gif-heading3",
  "gif-heading4",
];
const termsArray = ["Oh boy", "Shit", "Yeah", "Damn"];
const searchArray = [
  document.getElementById("more-button2"),
  document.getElementById("more-button3"),
  document.getElementById("more-button1"),
  document.getElementById("more-button4"),
];

const loadSuggestedGifs = () => {
  termsArray.sort((a, b) => 0.5 - Math.random());
  termsArray.forEach(async (element, index) => {
    const searchUrl = SEARCH + element;
    const gif = await createGifObjectsArray(searchUrl);
    const img = document.getElementById(gifPositions[index]);
    img.setAttribute("src", gif[index].url);
    img.setAttribute("alt", gif[index].title);
    const hashtag = document.getElementById(idsArray[index]);
    hashtag.innerHTML = "#" + termsArray[index];
    searchOnVerMas();
  });
};

const searchOnVerMas = () => {
  searchArray.forEach((element, index) => {
    element.onclick = () => {
      loadSection(SEARCH + termsArray[index], "result-gifs-container");
      sessionSearches.unshift(termsArray[index]);
      sessionStorage.setItem(
        "sessionSearches",
        JSON.stringify(sessionSearches)
      );
      document.getElementById("results-intro").innerHTML =
        "Resultados: (" + termsArray[index] + ")";
      const resultsSection = document.getElementById("results-section");
      resultsSection.style.display = "block";
      resultsSection.scrollIntoView();
      loadRecentSearches();
    };
  });
};
