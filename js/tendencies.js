let API_KEY = "nviDGCCp3515X3VeiJdD4zAohJ9inqtJ";

let getFromApi = async (section, limit) => {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/${section}?api_key=${API_KEY}&limit=${limit}`
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

let createGifObjectsArray = async () => {
  let data = await getFromApi("trending", "0");
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

const container = document.getElementById("gif-container");
let changeGifImgAndTitle = async () => {
  let array = await createGifObjectsArray();
  array.forEach((element, index) => {
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "template-gif");
    const img = document.createElement("img");
    img.setAttribute("src", array[index].url);
    img.setAttribute("class", "gif-img");
    const divTitle = document.createElement("div");
    divTitle.setAttribute("class", "gif-title");
    const gifTitle = document.createElement("p");
    gifTitle.innerHTML = array[index].title;
    gifTitle.setAttribute("class", "gif-text");
    divImg.appendChild(img);
    divImg.appendChild(divTitle);
    divTitle.appendChild(gifTitle);
    container.appendChild(divImg);
  });
};

changeGifImgAndTitle();
