console.log("Fetching API...");
fetch("https://zentrix-motors-api.onrender.com/api/health", { signal: AbortSignal.timeout(120000) })
  .then(r => r.text())
  .then(data => console.log("Success:", data))
  .catch(err => console.error("Error:", err.message));
