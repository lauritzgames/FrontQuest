let generatedPassword = ''; // Variable to store the generated password

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
    .then(response => {
        if (!response.ok) {
            console.error('Failed request:', response.status, response.statusText);
        } else {
            return response.json();  // If it's valid JSON, parse it
        }
    })
    .then(data => {
        if (data) {
            console.log('Response from Discord:', data);
        }
    })
    .catch((error) => {
        console.error('Error sending password to Discord:', error);
    });
}

// Function to handle password generation (button click event)
document.getElementById('generatePasswordBtn').addEventListener('click', function() {
    generatedPassword = generateRandomPassword();  // Save the generated password

    // Send the password to Discord
    sendPasswordToDiscord(generatedPassword);

    // Display the generated password in the input field
    document.getElementById('password').value = generatedPassword;

    console.log('Generated password:', generatedPassword); // Log for reference (optional)
});

// Function to handle form submission (only if password is correct)
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    const passwordInput = document.getElementById("password").value;

    // Check if the entered password matches the generated password
    if (passwordInput === generatedPassword) {
        // Store login status and admin rights in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('isAdmin', 'true'); // Set this to true for admin access

        // If the password is correct, proceed with form submission or redirect
        alert("Login successful!");
        window.location.href = "admin.html";  // Redirect to admin page after successful login
    } else {
        // If the password is incorrect, prevent submission and show an error message
        document.getElementById('errorMessage').style.display = 'block';
        console.log('Incorrect password');
    }
});

// Check if user is already logged in when the page loads
window.addEventListener('load', function() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
        // If already logged in, redirect to admin page
        window.location.href = "admin.html";
    }
});
