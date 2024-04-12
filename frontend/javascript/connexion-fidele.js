
document.addEventListener('DOMContentLoaded', function () {
    

    const lastName = window.localStorage.getItem("lastName"); 
    console.log(lastName);

    const notification = document.getElementById('notification');
    if (lastName) {
        notification.innerText = `M./Mme ${lastName}, votre inscription s'est réalisée sans encombre.`;
        notification.style.display = 'block';
    } else {
        console.error("L'élément avec l'ID 'notification' n'a pas été trouvé dans le DOM.");
    }
    window.localStorage.removeItem("lastName");


    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = document.getElementById('userName').value;
        const password = document.getElementById('loginPassword').value;

        const formData = {
            username: username,
            password: password
        }; 
        console.log(formData)

        fetch("http://localhost:5000/fidele/connexion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                //console.log(response.formData);
                console.log("ok");
                localStorage.setItem("connexionPath", "http://localhost:5000/fidele/connexion");

                window.location.href = '../html/user.html';
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Mauvaise combinaison utilisateur ou mot de pass`;
                notification.style.display = 'block';
            }
            return response.json();
        }) .then((data) => {
            console.log(data);
            window.localStorage.setItem("token", data.token);
            console.log(data.token);

        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });
});
