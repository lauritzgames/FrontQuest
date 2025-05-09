let Password = "\x56\x38\x54\x6a\x64\x6e\x72\x37\x69\x59\x40\x6b\x67\x67\x21\x4a\x39\x66\x6f\x5a\x34\x78"; // Variable to store the generated password

// Function to generate a random password (length 10, customizable)

// Function to handle form submission (only if password is correct)
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    const passwordInput = document.getElementById("password").value;

    // Check if the entered password matches the generated password
    if (passwordInput === Password) {
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
