let getSuggestedResults = async (term) => {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&limit=3&q=${term}`
    );
    if (response.ok) {
      let responseJson = await response.json();
      return responseJson.data;
    }
    return null;
  } catch (error) {
    console.log("Error ", error);
  }
};

let createResultsArray = async (term) => {
  let data = await getSuggestedResults(term);
  if (data == null) {
    console.log("Error in fetch response");
    return "images/Capture1.jpg";
  } else {
    let resultsArray = [];
    data.forEach((element, index) => {
      resultsArray.push(data[index].name);
    });
    return resultsArray;
  }
};

let posArray = ["result1", "result2", "result3"];

let loadSuggestedResults = async (term) => {
  let array = await createResultsArray(term);
  array.forEach(async (element, index) => {
    let result = document.getElementById(posArray[index]);
    result.innerHTML = element;
  });
};

let inputField = document.getElementById("input-field");
inputField.oninput = function () {
  let term = document.getElementById("input-field").value;
  loadSuggestedResults(term);
};

let searchButton = document.getElementById("search-button");
let sessionSearches = [];

searchButton.onclick = () => {
  let searchTerm = document.getElementById("input-field").value;
  changeGifImgsAndTitles(searchTerm);
  sessionSearches.unshift(searchTerm);
  sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
  let resultsSection = document.getElementById("results-section");
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView();
  loadRecentSearches();
};

let loadRecentSearches = () => {
  let recent = JSON.parse(sessionStorage.getItem("sessionSearches"));
  recent.forEach((element, index) => {
    let result = document.getElementById(posArray[index]);
    result.innerHTML = element;
  });
};
