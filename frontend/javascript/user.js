document.addEventListener('DOMContentLoaded', function () {
    const token = window.localStorage.getItem("token");
    console.log(token);


    const connexionPath = localStorage.getItem("connexionPath");

    if (connexionPath === "http://localhost:5000/benevole/connexion") {
        var evenementsLink = document.getElementById('evenementsLink');
        evenementsLink.style.display = 'none';
    }else{
        var benevolesLink = document.getElementById('benevolesLink');
        benevolesLink.href = "../html/benevolat-fidele.html";
    }
    localStorage.removeItem("connexionPath");
    
    

if (!token) {
    const headerLinks = document.querySelectorAll('header a');

    headerLinks.forEach(link => {
        if (!link.classList.contains('login') && !link.classList.contains('signup')) {
            link.addEventListener('click', event => {
                event.preventDefault();

                window.location.href = "./inscription-benevole.html";
            });
        }
    });

    const loginLink = document.querySelector('.auth .login a');

    loginLink.addEventListener('click', event => {
        event.preventDefault(); 

        window.location.href = "./connexion-benevole.html";
    });
} else {
    fetch("http://localhost:5000/benevole/select", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                console.log("Token expired or invalid. User will be logged out."); 
                window.localStorage.removeItem("token");
                window.location.href = "../html/connexion-benevole.html";
            } else {
                console.error(`Server error: ${response.status}`);
                console.log("Response details:", response);
                throw new Error(`Server error: ${response.status}`);
            }
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}
});

//localStorage.removeItem("token");
