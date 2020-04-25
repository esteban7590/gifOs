document.getElementById("nav-buttons").style.display = "none";

const start = document.getElementById("start");
start.onclick = () => {
  document.getElementById("crear-window").style.display = "none";
  document.getElementById("grabar").style.display = "flex";
  document.getElementById("record-window").style.display = "flex";
  document.getElementById("mis-guifos-section").style.display = "none";
  setRecorder();
};

const cancel = document.getElementById("cancel");
cancel.onclick = () => {
  changeHtml("mis-guifos.html");
};

loadSection(TRENDING, "mis-guifos-container");
