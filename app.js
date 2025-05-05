document.addEventListener('DOMContentLoaded', (event) => {
  // Replace with your actual JSONBin details
const BIN_ID = "681794d88960c979a5934bb8"; // Replace with your JSONBin bin ID
const API_KEY = "$2a$10$EsCCuXfyAxRHJCUcwZDV1OsHaovRf3c.VzxRNRVuYc1BE0EzzmFh."; // Replace with your JSONBin API key

  const appListContainer = document.getElementById('app-list');

  // Fetch apps from JSONBin and display them
  async function fetchApps() {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        headers: {
          'X-Master-Key': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching data from JSONBin:", errorText);
        throw new Error("Failed to fetch apps.");
      }

      const data = await response.json();
      console.log("Fetched data from JSONBin:", data);  // Log the response

      const apps = data.record.apps; // Assuming the apps data is in 'record.apps'
      console.log("Apps data:", apps);  // Log apps data for debugging

      // Filter apps to only show those that are 'approved'
      const approvedApps = apps.filter(app => app.status === 'approved');
      console.log("Approved apps:", approvedApps); // Log approved apps for debugging

      if (approvedApps.length > 0) {
        appListContainer.innerHTML = ''; // Clear the container before rendering
        approvedApps.forEach(app => {
          const appDiv = document.createElement('div');
          appDiv.classList.add('app-card');
          appDiv.innerHTML = `
            <h3>${app.name}</h3>
            <p><strong>Category:</strong> ${app.category}</p>
            <p><strong>Description:</strong> ${app.description}</p>
            <p><strong>APK URL:</strong> <a href="${app.url}" target="_blank">Download</a></p>
            <p>Status: ${app.status}</p>
          `;
          appListContainer.appendChild(appDiv);
        });
      } else {
        appListContainer.innerHTML = '<p>No approved apps available.</p>';
      }

    } catch (error) {
      console.error("Error:", error);
      appListContainer.innerHTML = '<p>Failed to load apps. Check the console for errors.</p>';
    }
  }

  // Call the fetchApps function on page load
  fetchApps();

  // Attach listeners to category buttons
  let currentCategory = "all"; // Default to showing all apps

  // Attach listeners to category buttons
  document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      currentCategory = e.target.getAttribute("data-category"); // Update selected category
      fetchApps(); // Refetch and render apps based on the selected category
    });
  });
  
  // Fetch apps from JSONBin
  async function fetchApps() {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY
        }
      });
  
      const data = await response.json();
      apps = data.record.apps || [];
  
      // Filter apps based on selected category
      const filteredApps = apps.filter(app => {
        return currentCategory === "all" || app.status === currentCategory;
      });
  
      // Render the filtered apps
      renderApps(filteredApps);
    } catch (err) {
      console.error("❌ Failed to fetch apps:", err);
    }
  }
  
  // Render the apps to the screen
  function renderApps(apps) {
    const appList = document.getElementById("app-list");
    appList.innerHTML = ""; // Clear existing apps
  
    apps.forEach(app => {
      if (app.status !== "rejected") {
      const div = document.createElement("div");
      div.className = `app ${app.status}`; // Dynamically add status as a class
  
      div.innerHTML = `
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <p class="status">Status: <span class="status-${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span></p>
        <a href="${app.url}" target="_blank">Download</a>
        ${app.status === "pending" ? `
          <button class="accept-btn" data-id="${app.id}">Accept</button>
          <button class="reject-btn" data-id="${app.id}">Reject</button>
        ` : ""}
      `;
      appList.appendChild(div);
        }
    });
  
    // Attach event listeners to the buttons
    attachButtonListeners();
  }

});
