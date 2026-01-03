document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("token");
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
});
