const apiFetch = async (url) => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let responseJson = await response.json();
      return responseJson.data;
    }
    return null;
  } catch (error) {
    document.getElementById("wrong").style.display = "block";
    console.log("Error ", error);
  }
};

const createGifObjectsArray = async (url) => {
  let data = await apiFetch(url);
  if (data) {
    let gifObjectsArray = [];
    data.forEach((element) => {
      let gifObject = new Object();
      gifObject.title = element.title;
      gifObject.url = element.images.fixed_height.url;
      gifObjectsArray.push(gifObject);
    });
    return gifObjectsArray;
  } else {
    console.log("Error in fetch response");
    document.getElementById("wrong").style.display = "block";
  }
};

const loadSection = async (url, sectionContainer) => {
  const container = document.getElementById(sectionContainer);
  container.innerHTML = "";
  let array = await createGifObjectsArray(url);
  array.forEach((element, index) => {
    const gifContainer = document.createElement("div");
    gifContainer.setAttribute("class", "template-gif");
    const img = document.createElement("img");
    img.setAttribute("src", array[index].url);
    img.setAttribute("alt", array[index].title);
    img.setAttribute("class", "gif-img");
    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "gif-title");
    const gifTitle = document.createElement("p");
    gifTitle.innerHTML = array[index].title;
    gifTitle.setAttribute("class", "gif-text");
    gifContainer.appendChild(img);
    gifContainer.appendChild(titleContainer);
    titleContainer.appendChild(gifTitle);
    container.appendChild(gifContainer);
  });
};

const loadMisGuifos = () => {
  if (localStorage.length !== 0) {
    let idsAarray = [];
    for (let index = 0; index < localStorage.length; index++) {
      let id = localStorage.key(index);
      idsAarray.unshift(id);
    }
    let misUrl = API_URL + "?" + API_KEY + "&" + "ids=" + idsAarray;
    loadSection(misUrl, "mis-guifos-container");
  } else {
    document.getElementById("wrong").innerHTML =
      "Aqui apareceran los guifos que vayas creando...";
    document.getElementById("wrong").style.display = "block";
  }
};

const crearOnClick = () => {
  const misGuifos = document.getElementById("mis-guifos");
  misGuifos.onclick = () => {
    changeHtml("mis-guifos.html");
  };

  const crearGuifos = document.getElementById("crear-button");
  crearGuifos.onclick = () => {
    changeHtml("crear-guifos.html");
  };
};

const changeHtml = (url) => {
  window.location.href = url;
};
