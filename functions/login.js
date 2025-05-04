exports.handler = async function(event, context) {
    const { username, password } = JSON.parse(event.body); // Assuming you send username and password in the POST body
  
    const adminUsername = process.env.ADMIN_USERNAME; // Get the username from Netlify's environment variables
    const adminPassword = process.env.ADMIN_PASSWORD; // Get the password from Netlify's environment variables
  
    // Check if the provided credentials match the stored credentials
    if (username === adminUsername && password === adminPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Access granted" })
      };
    }
  
    // If credentials are incorrect
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Invalid credentials" })
    };
  };
  