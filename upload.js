// Replace with your actual JSONBin details
const BIN_ID = "681794d88960c979a5934bb8"; // Replace with your JSONBin bin ID
const API_KEY = "$2a$10$EsCCuXfyAxRHJCUcwZDV1OsHaovRf3c.VzxRNRVuYc1BE0EzzmFh."; // Replace with your JSONBin API key
// Get the form and elements
const uploadForm = document.getElementById('uploadForm');
const appName = document.getElementById('appName');
const appCategory = document.getElementById('appCategory');
const appDescription = document.getElementById('appDescription');
const apkUrl = document.getElementById('apkUrl');

// Handle form submission
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const newApp = {
    id: Date.now(), // Unique ID based on the current timestamp
    name: appName.value,
    description: appDescription.value,
    category: appCategory.value,
    url: apkUrl.value,
    status: 'pending'  // App will be pending for approval
  };
  

  try {
    // Fetch current apps data from JSONBin
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    // Log the response to help with debugging
    if (!response.ok) {
      const errorText = await response.text(); // Get the error message
      console.error("Error fetching data from JSONBin:", errorText);
      throw new Error("Failed to fetch current app data from JSONBin.");
    }

    const data = await response.json();
    console.log("Current data fetched from JSONBin:", data);

    // Check if apps key exists, otherwise initialize it
    const apps = data.record && data.record.apps ? data.record.apps : [];

    // Add the new app to the apps array
    apps.push(newApp);

    // Send the updated apps list back to JSONBin using PUT
    const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',  // Use PUT instead of PATCH to update the entire bin
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apps: apps
      })
    });

    // Log the update response for debugging
    if (!updateResponse.ok) {
      const updateErrorText = await updateResponse.text();
      console.error("Error updating JSONBin:", updateErrorText);
      throw new Error("Failed to update JSONBin with the new app.");
    }

    alert("APK uploaded successfully and is awaiting approval!");
    // Optionally, clear the form
    uploadForm.reset();
  } catch (error) {
    // Log the error details for debugging
    console.error("Error uploading APK:", error);
    alert("An error occurred. Please check the console for details.");
  }
});
