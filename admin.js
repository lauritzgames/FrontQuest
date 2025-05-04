document.addEventListener('DOMContentLoaded', (event) => {
    const BIN_ID = "681794d88960c979a5934bb8"; // Replace with your JSONBin bin ID
    const API_KEY = "$2a$10$EsCCuXfyAxRHJCUcwZDV1OsHaovRf3c.VzxRNRVuYc1BE0EzzmFh."; // Replace with your JSONBin API key
  
    const appListContainer = document.getElementById('app-list');
    let apps = []; // Declare apps as a global variable
  
    // Fetch apps from JSONBin and display them
    async function fetchApps() {
        try {
          const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
              'X-Master-Key': API_KEY
            }
          });
      
          const data = await response.json();
          apps = data.record.apps || [];
      
          const appList = document.getElementById("app-list");
          appList.innerHTML = "";
      
          apps.forEach(app => {
            const div = document.createElement("div");
            div.className = "app";
      
            div.innerHTML = `
              <h3>${app.name}</h3>
              <p>${app.description}</p>
              <p>Status: ${app.status}</p>
              <a href="${app.url}" target="_blank">Download</a>
              ${app.status === "pending" ? `
                <button class="accept-btn" data-id="${app.id}">Accept</button>
                <button class="reject-btn" data-id="${app.id}">Reject</button>
              ` : ""}
            `;
      
            appList.appendChild(div);
          });
      
          // Attach events directly here
          document.querySelectorAll(".accept-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              const id = btn.getAttribute("data-id");
              updateAppStatus(id, "approved");
            });
          });
      
          document.querySelectorAll(".reject-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              const id = btn.getAttribute("data-id");
              updateAppStatus(id, "rejected");
            });
          });
      
        } catch (err) {
          console.error("❌ Failed to fetch apps:", err);
        }
      }
      
      
      
  
    // Function to update app status in JSONBin
    async function updateAppStatus(appId, newStatus) {
        try {
          console.log("🛠 Updating app ID:", appId, "to status:", newStatus);
      
          // Check current state of apps
          console.log("🧾 Current apps before update:", apps);
      
          // Update correct app in the array
          const updatedApps = apps.map(app => {
            if (String(app.id) === String(appId)) {
              console.log("✅ Found app to update:", app);
              return { ...app, status: newStatus };
            }
            return app;
          });
      
          // Assign updated apps to global
          apps = updatedApps;
      
          // Prepare payload
          const payload = { apps };
          console.log("📦 Sending payload:", JSON.stringify(payload, null, 2));
      
          const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': API_KEY,
              'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify(payload)
          });
      
          if (!response.ok) throw new Error("Failed to update bin");
      
          console.log("✅ App status updated successfully.");
          fetchApps(); // reload updated list
        } catch (err) {
          console.error("❌ Error in updateAppStatus:", err);
        }
      }
      
      
      
      
  
    // Call the fetchApps function on page load
    fetchApps();
  });
  
  document.getElementById('logoutBtn').addEventListener('click', function() {
    // Remove the logged-in status from localStorage
    localStorage.removeItem('loggedIn');
    
    // Redirect to the login page
    window.location.href = "login.html";
});
