"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        // We still register the SW here to ensure it's ready before the next page loads
        await registerSW();
        
        // Use the search function from search.js to format the URL
        const url = search(address.value, searchEngine.value);

        // Redirect to search.html and pass the URL as a base64 string (cleaner for URLs)
        // or just as a URI component
        window.location.href = "search.html?url=" + encodeURIComponent(url);

    } catch (err) {
        error.textContent = "Failed to coordinate navigation.";
        errorCode.textContent = err.toString();
    }
});