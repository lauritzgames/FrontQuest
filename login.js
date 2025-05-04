// Function to generate a random password (length 10, customizable)
function generateRandomPassword(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

// Function to send the password to a Discord webhook
function sendPasswordToDiscord(password) {
  const webhookURL = 'https://discord.com/api/webhooks/1368655485489909850/9lNt7xEWmpVwxXwWrkMufyglcd277FnUhOKcp2a04EhDyW0OVll_IeO8g2NRmA5TeRPx';  // Replace with your Discord webhook URL

  const data = {
      content: `A new admin password has been generated: **${password}**`
  };

  fetch(webhookURL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Password sent to Discord:', data))
  .catch((error) => console.error('Error:', error));
}

// Function to handle password generation and form submission
document.getElementById('generatePasswordBtn').addEventListener('click', function() {
  const password = generateRandomPassword();
  document.getElementById('password').value = password;  // Display the password in the input field
  sendPasswordToDiscord(password);  // Send the password to Discord
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const passwordInput = document.getElementById("password").value;

  // You can validate the password here if necessary
  if (passwordInput) {
      alert("Password submitted successfully!");
      // Redirect to admin panel or perform any other logic here
      window.location.href = "admin.html";
  } else {
      alert("Please generate a password first.");
  }
});
