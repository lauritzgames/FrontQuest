document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const passwordInput = document.getElementById("password").value;

  // The admin password is injected into this file during deployment (via GitHub Actions)
  if (passwordInput === adminPassword) {
    window.location.href = "admin.html";  // Redirect to admin panel if correct
  } else {
    alert("Invalid password. Please try again.");
  }
});
