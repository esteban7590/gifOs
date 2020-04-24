window.onload = () => {
  loadSuggestedGifs();
  loadSection(TRENDING, "trending-gifs-container");

  const misGuifos = document.getElementById("mis-guifos");
  misGuifos.onclick = () => {
    cambiarHtml();
  };

  const crearGifos = document.getElementById("crear-button");
  crearGifos.onclick = () => {
    cambiarHtml();
  };

  const cambiarHtml = () => {
    window.location.href = `mis-guifos.html`;
  };
};
