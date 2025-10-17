const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("expanded");
  toggleBtn.innerHTML = sidebar.classList.contains("expanded")
    ? "&#9654;"
    : "&#9664;";
});
