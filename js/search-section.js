// display or hide the dropdown
document.getElementById("input-field").onkeydown = () => {
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "block";
};

document.getElementById("close-onsearch").onclick = () => {
  document.getElementById("input-field").value = "";
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "none";
};

//action to be perfmormed when a search using input is needed
let sessionSearches = [];
const inputSearch = () => {
  let searchTerm = document.getElementById("input-field").value;
  let searchUrl = SEARCH + searchTerm;
  loadSection(searchUrl, "result-gifs-container");
  sessionSearches.unshift(searchTerm);
  sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
  document.getElementById("results-intro").innerHTML =
    "Resultados: (" + searchTerm + ")";
  let resultsSection = document.getElementById("results-section");
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView();
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "none";
  loadRecentSearches();
  document.getElementById("input-field").value = "";
};

let searchButton = document.getElementById("search-button");
searchButton.onclick = () => {
  inputSearch();
};

document.getElementById("input-field").onkeyup = (event) => {
  if (event.keyCode === 13) {
    inputSearch();
  }
};

//autocomplete search
let createNamesArray = async (url) => {
  let data = await apiFetch(url);
  if (data) {
    let namesArray = [];
    data.forEach((element, index) => {
      namesArray.push(data[index].name);
    });
    return namesArray;
  } else {
    console.log("Error in fetch response");
    document.getElementById("wrong").style.display = "block";
  }
};

let loadNames = async (url) => {
  let posArray = ["result1", "result2", "result3"];
  let array = await createNamesArray(url);
  array.forEach(async (element, index) => {
    let result = document.getElementById(posArray[index]);
    result.innerHTML = element;
  });
};

//search on suggestion click
let searchSuggestion1 = document.getElementById("result1");
let searchSuggestion2 = document.getElementById("result2");
let searchSuggestion3 = document.getElementById("result3");

let suggestionArray = [searchSuggestion1, searchSuggestion2, searchSuggestion3];

suggestionArray.forEach((element) => {
  element.onclick = () => {
    loadSection(SEARCH + element.innerHTML, "result-gifs-container");
    sessionSearches.unshift(element.innerHTML);
    sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
    document.getElementById("results-intro").innerHTML =
      "Resultados: (" + element.innerHTML + ")";
    document.getElementById("input-field").value = "";
    let onSearch = document.getElementById("auto-list");
    onSearch.style.display = "none";
    let resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView();
    loadRecentSearches();
  };
});

let inputField = document.getElementById("input-field");
inputField.oninput = function () {
  let term = document.getElementById("input-field").value;
  let url = AUTOCOMPLETE + term;
  loadNames(url);
};

//load search history
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
        loadSection(SEARCH + element, "result-gifs-container");
        document.getElementById("results-intro").innerHTML =
          "Resultados: (" + element + ")";
        let resultsSection = document.getElementById("results-section");
        resultsSection.style.display = "block";
        resultsSection.scrollIntoView();
      };
    });
  }
};
