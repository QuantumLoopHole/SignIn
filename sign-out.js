function toggleOtherInput() {
    const reasonSelect = document.getElementById("reason");
    const otherReasonInput = document.getElementById("otherReason");

    if (reasonSelect.value === "Other") {
        otherReasonInput.style.display = "block"; // Show input field if "Other" is selected
        otherReasonInput.required = true; // Make it required if shown
    } else {
        otherReasonInput.style.display = "none"; // Hide input field if other options are selected
        otherReasonInput.required = false; // Remove required attribute
        otherReasonInput.value = ""; // Clear input field if hidden
    }
}

// Existing submit function
document.getElementById("sign-in-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevents the default form submission

    const inout = 'OUT'; // Define inout here
    const loginName = document.getElementById("name").value;
    const reasonSelect = document.getElementById("reason");
    const reason = reasonSelect.value === "Other" ? document.getElementById("otherReason").value : reasonSelect.value; // Get either selected or inputted value

    const url = `http://127.0.0.1:5000/Log?LoginName=${encodeURIComponent(loginName)}&Reason=${encodeURIComponent(reason)}&inout=${encodeURIComponent(inout)}`;

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        window.location.href = "./index.html";
        return response.json();
    })
    .then(data => {
        console.log("Response from server:", data.message);
       

    })
    .catch(error => {
        console.error("Error:", error);
    });

});

function cancel() {
    window.location.href = './cancel.html';
}
