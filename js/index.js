loadSuggestedGifs();
loadSection(TRENDING, "trending-gifs-container");

const misGuifos = document.getElementById("mis-guifos");
misGuifos.onclick = () => {
  window.location.href = "mis-guifos.html";
};
