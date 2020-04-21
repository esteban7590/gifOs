let darkButton = document.getElementById("night");
let lightButton = document.getElementById("day");

darkButton.onclick = () => {
  document.getElementById("body-theme").className = "sailor-night";
};

lightButton.onclick = () => {
  document.getElementById("body-theme").className = "sailor-day";
};
