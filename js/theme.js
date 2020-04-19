let darkButton = document.getElementById("night");
let lightButton = document.getElementById("day");

darkButton.onclick = () => {
  document.getElementsByClassName("sailor-day")[0].className = "sailor-night";
};

lightButton.onclick = () => {
  document.getElementsByClassName("sailor-night")[0].className = "sailor-day";
};
