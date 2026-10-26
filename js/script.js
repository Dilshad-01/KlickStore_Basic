function showMessage() {
    alert("Welcome to KlickStore!");
}

function addCart(productName) {
    var label = productName ? productName : "Product";
    alert(label + " added to cart successfully!");
}

function contactMessage() {
    alert("Thank you! Your message has been sent to KlickStore.");
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
    } else {
        alert("Welcome back to KlickStore!");
    }
}
