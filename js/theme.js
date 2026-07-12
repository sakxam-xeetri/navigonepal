(function () {
  // 1. Get saved theme or default to light
  const savedTheme = localStorage.getItem("navigo-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // 2. Once DOM is ready, bind theme toggle listeners
  window.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const sunIcon = themeToggle.querySelector(".sun-icon");
    const moonIcon = themeToggle.querySelector(".moon-icon");

    function updateThemeIcons(theme) {
      if (theme === "dark") {
        if (sunIcon) sunIcon.style.display = "block";
        if (moonIcon) moonIcon.style.display = "none";
      } else {
        if (sunIcon) sunIcon.style.display = "none";
        if (moonIcon) moonIcon.style.display = "block";
      }
    }

    // Initialize icons based on current theme attribute
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    updateThemeIcons(currentTheme);

    // Event listener for theme toggle button click
    themeToggle.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = activeTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", targetTheme);
      localStorage.setItem("navigo-theme", targetTheme);
      updateThemeIcons(targetTheme);
    });
  });
})();
