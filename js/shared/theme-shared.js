const DROPDOWN = document.getElementById("dropdown-themes");

const themeChange = () => {
  document.getElementById("theme-button").onclick = () => {
    console.log("drop");
    DROPDOWN.style.display = "block";
  };
  document.getElementById("theme-button-arrow").onclick = () => {
    DROPDOWN.style.display = "block";
  };
  document.getElementById("night").onclick = () => {
    console.log("night");
    document.getElementById("body-theme").className = "sailor-night";
    DROPDOWN.style.display = "none";
  };
  document.getElementById("day").onclick = () => {
    console.log("day");
    document.getElementById("body-theme").className = "sailor-day";
    DROPDOWN.style.display = "none";
  };
};
