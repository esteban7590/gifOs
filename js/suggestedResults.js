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

searchButton.onclick = searchAction = () => {
  let searchTerm = document.getElementById("input-field").value;
  changeGifImgsAndTitles(searchTerm);
  sessionSearches.unshift(searchTerm);
  sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
  let resultsSection = document.getElementById("results-section");
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView();
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "none";
  loadRecentSearches();
  searchTerm = "";
  document.getElementById("input-field").innerHTML = "";
};

let loadRecentSearches = () => {
  let buttonsContainer = document.getElementById("results-buttons-container");
  buttonsContainer.style.display = "block";
  let recent = JSON.parse(sessionStorage.getItem("sessionSearches"));
  if (recent == "") {
    buttonsContainer.style.display = "none";
  } else {
    buttonsContainer.innerHTML = "";
    recent.forEach((element) => {
      let recentButton = document.createElement("button");
      recentButton.setAttribute("class", "result-button");
      recentButton.innerHTML = "#" + element;
      buttonsContainer.appendChild(recentButton);
      recentButton.onclick = () => {
        changeGifImgsAndTitles(element);
        let resultsSection = document.getElementById("results-section");
        resultsSection.style.display = "block";
        resultsSection.scrollIntoView();
      };
    });
  }
};
