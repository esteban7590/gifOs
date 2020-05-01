const dropdown = document.getElementById("dropdown-themes");

const themeChange = () => {
  document.getElementById("theme-button").onclick = (event) => {
    dropdown.style.display = "block";
    event.stopPropagation();
    window.onclick = (ev) => {
      dropdown.style.display = "none";
    };
  };
  document.getElementById("theme-button-arrow").onclick = (event) => {
    dropdown.style.display = "block";
    event.stopPropagation();
    window.onclick = (ev) => {
      dropdown.style.display = "none";
    };
  };
  document.getElementById("night").onclick = () => {
    document.getElementById("body-theme").className = "sailor-night";
    dropdown.style.display = "none";
  };
  document.getElementById("day").onclick = () => {
    document.getElementById("body-theme").className = "sailor-day";
    dropdown.style.display = "none";
  };
};
