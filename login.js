document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const correctUsername = "admin";
  const correctPassword = "password123";

  if (username === correctUsername && password === correctPassword) {
    // Redirect to admin page if login is successful
    window.location.href = "admin.html";
  } else {
    alert("Invalid credentials, please try again.");
  }
});
