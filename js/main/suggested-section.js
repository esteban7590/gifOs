const GIF_POSITIONS = ["pos1", "pos2", "pos3", "pos4"];
const IDS_ARRAY = [
  "gif-heading1",
  "gif-heading2",
  "gif-heading3",
  "gif-heading4",
];
const TERMS_ARRAY = ["Oh boy", "Shit", "Yeah", "Damn"];
const SEARCH_ARRAY = [
  document.getElementById("more-button2"),
  document.getElementById("more-button3"),
  document.getElementById("more-button1"),
  document.getElementById("more-button4"),
];

const loadSuggestedGifs = () => {
  TERMS_ARRAY.sort((a, b) => 0.5 - Math.random());
  TERMS_ARRAY.forEach(async (element, index) => {
    const searchUrl = SEARCH + element;
    const gif = await createGifObjectsArray(searchUrl);
    const img = document.getElementById(GIF_POSITIONS[index]);
    img.setAttribute("src", gif[index].url);
    img.setAttribute("alt", gif[index].title);
    const hashtag = document.getElementById(IDS_ARRAY[index]);
    hashtag.innerHTML = "#" + TERMS_ARRAY[index];
    searchOnVerMas();
  });
};

const searchOnVerMas = () => {
  SEARCH_ARRAY.forEach((element, index) => {
    element.onclick = () => {
      loadSection(SEARCH + TERMS_ARRAY[index], "result-gifs-container");
      SESSION_SEARCHES.unshift(TERMS_ARRAY[index]);
      sessionStorage.setItem(
        "SESSION_SEARCHES",
        JSON.stringify(SESSION_SEARCHES)
      );
      document.getElementById("results-intro").innerHTML =
        "Resultados: (" + TERMS_ARRAY[index] + ")";
      const resultsSection = document.getElementById("results-section");
      resultsSection.style.display = "block";
      resultsSection.scrollIntoView();
      loadRecentSearches();
    };
  });
};
