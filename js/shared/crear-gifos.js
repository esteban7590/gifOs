window.onload = () => {
  setHtml();
  
  const start = document.getElementById("start");
  start.onclick = () => {
    document.getElementById("crear-window").style.display = "none";
    document.getElementById("grabar").style.display = "block";
    document.getElementById("record-window").style.display = "flex";
    document.getElementById("mis-guifos-section").style.display = "none";
    setRecorder();
  };

  const cancel = document.getElementById("cancel");
  cancel.onclick = () => {
    document.getElementById("record-section").style.display = "none";
    document.getElementById("nav-buttons").style.display = "flex";
  };
};
