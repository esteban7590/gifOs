document.getElementById("nav-buttons").style.display = "none";
document.getElementById("done-window-container").style.display = "none";
const uploadingContainer = document.getElementById("uploading-container");
uploadingContainer.style.display = "none";
const timeStopContainer = document.getElementById("time-stop-container");
timeStopContainer.style.display = "none";
const uploadRepeatContainer = document.getElementById(
  "upload-repeat-container"
);
uploadRepeatContainer.style.display = "none";
const cancelButton = document.getElementById("cancel-button");
cancelButton.style.display = "none";

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

//---------- donde pongo esto??
const boxContainer = document.getElementById("progress");
for (let index = 0; index < 23; index++) {
  const barBox = document.createElement("div");
  boxContainer.appendChild(barBox);
}
//-----------------

loadMisGuifos();
// loadSection(TRENDING, "mis-guifos-container");
