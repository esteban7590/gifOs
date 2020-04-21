loadSuggestedGifs();
loadSection(TRENDING, "trending-gifs-container");

const misGuifos = document.getElementById("mis-guifos");
misGuifos.onclick = () => {
  window.location.href = "mis-guifos.html";
};

const crearGifos = document.getElementById("crear-button");
crearGifos.onclick = () => {
  window.location.href = "mis-guifos.html";
  // function that set's up misguifos html to create
};
