const dropdown = document.getElementById("dropdown-themes");

const setTheme = () => {
  const theme = sessionStorage.getItem("theme");
  if (theme === "night") {
    document.getElementById("body-theme").className = "sailor-night";
  } else {
    document.getElementById("body-theme").className = "sailor-day";
  }
};

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
    sessionStorage.setItem("theme", "night");
  };
  document.getElementById("day").onclick = () => {
    document.getElementById("body-theme").className = "sailor-day";
    dropdown.style.display = "none";
    sessionStorage.setItem("theme", "day");
  };
};
