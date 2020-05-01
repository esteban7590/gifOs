const apiFetch = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson.data;
    }
    return null;
  } catch (error) {
    document.getElementById("wrong").style.display = "block";
    console.log("Error ", error);
  }
};

//organize API response into an array with only useful properties
const createGifObjectsArray = async (url) => {
  const data = await apiFetch(url);
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

//load an html section with the results from a fetch
const loadSection = async (url, sectionContainer) => {
  const container = document.getElementById(sectionContainer);
  container.innerHTML = "";
  let array = await createGifObjectsArray(url);
  array.forEach((element, index) => {
    setTimeout(() => {
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
    }, index * 120);
  });
};

const setUrl = (url) => {
  window.location.href = url;
};

const htmlChange = () => {
  document.getElementById("mis-guifos").onclick = () => {
    setUrl("mis-guifos.html");
  };
  document.getElementById("crear-button").onclick = () => {
    setUrl("crear-guifos.html");
  };
};

const loadMisGuifos = () => {
  if (localStorage.length !== 0) {
    let idsAarray = [];
    for (let index = 0; index < localStorage.length; index++) {
      const id = localStorage.key(index);
      idsAarray.unshift(id);
    }
    const url = GET_BY_IDS + idsAarray;
    loadSection(url, "mis-guifos-container");
  } else {
    document.getElementById("wrong").innerHTML =
      "Aqui apareceran los guifos que vayas creando...";
    document.getElementById("wrong").style.display = "block";
  }
};
