document.getElementById('signIn').addEventListener('click', function() {
    document.body.classList.add('slide-out');
    setTimeout(function() {
        window.location.href = 'sign-in-page.html'; // Redirect to your sign-in page
    }, 500); // Wait for the slide-out transition to complete
});

document.getElementById('signOut').addEventListener('click', function() {
    document.body.classList.add('slide-out');
    setTimeout(function() {
        window.location.href = 'sign-out-page.html'; // Redirect to your sign-out page
    }, 500); // Wait for the slide-out transition to complete
});


document.getElementById('name').innerText = "Welcome to " + localStorage.getItem("OrgName");


