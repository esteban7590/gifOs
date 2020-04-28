let sessionSearches = [];
const searchButton = document.getElementById("search-button");

const setSearchSection = () => {
  searchButton.disabled = true;
  document.getElementById("input-field").onkeydown = () => {
    document.getElementById("auto-list").style.display = "block";
    searchButton.disabled = false;
  };
  document.getElementById("close-onsearch").onclick = () => {
    document.getElementById("input-field").value = "";
    document.getElementById("auto-list").style.display = "none";
  };
  document.getElementById("input-field").onkeyup = (event) => {
    if (event.keyCode === 13) {
      inputSearch();
    }
  };
};

//action to be perfmormed when a search using input is needed
const inputSearch = () => {
  const searchTerm = document.getElementById("input-field").value;
  const searchUrl = SEARCH + searchTerm;
  loadSection(searchUrl, "result-gifs-container");
  sessionSearches.unshift(searchTerm);
  sessionStorage.setItem("sessionSearches", JSON.stringify(sessionSearches));
  document.getElementById("results-intro").innerHTML =
    "Resultados: (" + searchTerm + ")";
  const resultsSection = document.getElementById("results-section");
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView();
  const onSearch = document.getElementById("auto-list");
  onSearch.style.display = "none";
  loadRecentSearches();
  document.getElementById("input-field").value = "";
};

//search on autocomplete click
const createNamesArray = async (url) => {
  const data = await apiFetch(url);
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

const loadNames = async (url) => {
  const posArray = ["result1", "result2", "result3"];
  const array = await createNamesArray(url);
  array.forEach(async (element, index) => {
    let result = document.getElementById(posArray[index]);
    result.innerHTML = element;
  });
};

const loadAutocomplete = () => {
  const inputField = document.getElementById("input-field");
  inputField.oninput = function () {
    const term = document.getElementById("input-field").value;
    const url = AUTOCOMPLETE + term;
    loadNames(url);
  };
};

//search on suggestion click
const searchSuggestionBased = () => {
  const suggestionAarray = [
    document.getElementById("result1"),
    document.getElementById("result2"),
    document.getElementById("result3"),
  ];
  suggestionAarray.forEach((element) => {
    element.onclick = () => {
      loadSection(SEARCH + element.innerHTML, "result-gifs-container");
      sessionSearches.unshift(element.innerHTML);
      sessionStorage.setItem(
        "sessionSearches",
        JSON.stringify(sessionSearches)
      );
      document.getElementById("results-intro").innerHTML =
        "Resultados: (" + element.innerHTML + ")";
      document.getElementById("input-field").value = "";
      const onSearch = document.getElementById("auto-list");
      onSearch.style.display = "none";
      const resultsSection = document.getElementById("results-section");
      resultsSection.style.display = "block";
      resultsSection.scrollIntoView();
      loadRecentSearches();
    };
  });
};

//search on search button click
const searchOnButtonPress = () => {
  searchButton.onclick = () => {
    inputSearch();
    searchButton.disabled = true;
  };
};

//load search history
const loadRecentSearches = () => {
  const buttonsContainer = document.getElementById("results-buttons-container");
  buttonsContainer.style.display = "block";
  const recent = JSON.parse(sessionStorage.getItem("sessionSearches"));
  if (!recent) {
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

const loadSearchSection = () => {
  setSearchSection();
  loadAutocomplete();
  searchOnButtonPress();
  searchSuggestionBased();
  loadRecentSearches();
};
