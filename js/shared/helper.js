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
