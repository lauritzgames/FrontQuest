// Netlify function that checks the username and password

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ success: false, message: "Invalid HTTP method" })
    };
  }

  // Extracting username and password from the request body
  const { username, password } = JSON.parse(event.body);

  // Checking credentials against GitHub secrets
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Access granted" })
    };
  }

  // If credentials are incorrect
  return {
    statusCode: 401, // Unauthorized
    body: JSON.stringify({ success: false, message: "Invalid credentials" })
  };
};

document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.success) {
    // Redirect to admin panel upon successful login
    window.location.href = "admin.html";
  } else {
    alert(data.message); // Show error message
  }
});
