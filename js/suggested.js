let getSearched = async (searchTerm, limit) => {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=${limit}`
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

let createGifObject = async (searchTerm, limit) => {
  let data = await getSearched(searchTerm, limit);
  if (data == null) {
    console.log("Error in fetch response");
    return "images/Capture1.jpg";
  } else {
    let gifObject = new Object();
    gifObject.title = data[0].title;
    gifObject.url = data[0].images.fixed_height.url;
    return gifObject;
  }
};

let imgPosArray = ["pos1", "pos2", "pos3", "pos4"];
let idArray = ["gif-heading1", "gif-heading2", "gif-heading3", "gif-heading4"];
let termsArray = ["Oh boy", "Shit", "Yeah", "Damn"];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let termsArrayShuffled = shuffleArray(termsArray);

let loadSuggestedGif = () => {
  termsArray.forEach(async (element, index) => {
    let gif = await createGifObject(element, "1");
    let img = document.getElementById(imgPosArray[index]);
    img.setAttribute("src", gif.url);
    img.setAttribute("alt", gif.title);
    let hashtag = document.getElementById(idArray[index]);
    hashtag.innerHTML = "#" + termsArrayShuffled[index];
  });
};

loadSuggestedGif();

let searchButton1 = document.getElementById("more-button1");
let searchButton2 = document.getElementById("more-button2");
let searchButton3 = document.getElementById("more-button3");
let searchButton4 = document.getElementById("more-button4");

let searchArray = [searchButton1, searchButton2, searchButton3, searchButton4];

let searchSuggestion1 = document.getElementById("result1");
let searchSuggestion2 = document.getElementById("result2");
let searchSuggestion3 = document.getElementById("result3");

let suggestionArray = [searchSuggestion1, searchSuggestion2, searchSuggestion3];

searchArray.forEach((element, index) => {
  element.onclick = () => {
    changeGifImgsAndTitles(termsArrayShuffled[index]);
    let resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView();
  };
});

suggestionArray.forEach((element) => {
  element.onclick = () => {
    changeGifImgsAndTitles(element.innerHTML);
    let resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView();
  };
});
