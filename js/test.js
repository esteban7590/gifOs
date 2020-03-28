let getGif = async () => {
  let response = await fetch(
    "https://api.giphy.com/v1/gifs/search?api_key=nviDGCCp3515X3VeiJdD4zAohJ9inqtJ&q=go&limit=1&offset=0&rating=G&lang=en"
  );
  let text = await response.text();
  let json = JSON.parse(text);
  return json.data[0].embed_url;
};

let changeGif = () => {
  let img = document.getElementById("test");
  img.setAttribute("src", "https://giphy.com/embed/dr6toZX3D1O8");
};

let gif = getGif();

changeGif(gif);
