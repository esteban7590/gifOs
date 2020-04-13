document.getElementById("input-field").onkeydown = () => {
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "block";
};

document.getElementById("close-onsearch").onclick = () => {
  document.getElementById("input-field").value = "";
  let onSearch = document.getElementById("auto-list");
  onSearch.style.display = "none";
};

document.getElementById("input-field").onkeyup = (event) => {
  if (event.keyCode === 13) {
    searchAction();
  }
};

var data;

let searchFunction = async (term) => {
  return await getSearched(term, "0");
};

let createResultsGifsObjectsArray = async (term) => {
  let data = await searchFunction(term);
  if (data == null) {
    console.log("Error in fetch response");
    return "images/Capture1.jpg";
  } else {
    let imgObjectsArray = [];
    data.forEach((element) => {
      let gifObject = new Object();
      gifObject.title = element.title;
      gifObject.url = element.images.fixed_height.url;
      imgObjectsArray.push(gifObject);
    });
    return imgObjectsArray;
  }
};

let changeGifImgsAndTitles = async (term) => {
  const resultsContainer = document.getElementById("resultados");
  let array = await createResultsGifsObjectsArray(term);
  if (array.length === 0) {
    document.getElementById("results-intro").innerHTML =
      "No encontramos nada con tu criterio de busqueda :(";
    document.getElementById("resultados").innerHTML = "";
  } else {
    document.getElementById("resultados").innerHTML = "";
    document.getElementById("results-intro").innerHTML = term + " (resultados)";
    document.getElementById("input-field").value = "";
    array.forEach((element, index) => {
      const divImg = document.createElement("div");
      divImg.setAttribute("class", "template-gif");
      const img = document.createElement("img");
      img.setAttribute("src", array[index].url);
      img.setAttribute("alt", array[index].title);
      img.setAttribute("class", "gif-img");
      const divTitle = document.createElement("div");
      divTitle.setAttribute("class", "gif-title");
      const gifTitle = document.createElement("p");
      gifTitle.innerHTML = array[index].title;
      gifTitle.setAttribute("class", "gif-text");
      divImg.appendChild(img);
      divImg.appendChild(divTitle);
      divTitle.appendChild(gifTitle);
      resultsContainer.appendChild(divImg);
    });
  }
};
