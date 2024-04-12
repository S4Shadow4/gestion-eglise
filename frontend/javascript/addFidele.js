document.addEventListener('DOMContentLoaded', function () {
    const token = window.localStorage.getItem("token");
    console.log(token); 

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;

        const formData = {
            nom: nom,
            prenom: prenom
        };

        fetch("http://localhost:5000/addFidele/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Token expiré ou invalide. L'utilisateur sera déconnecté."); 
                    window.localStorage.removeItem("token");
                    window.location.href = "../html/admin.html";
                } else {
                    console.error(`Erreur serveur: ${response.status}`);
                    console.log("Détails de la réponse:", response);
                    throw new Error(`Erreur serveur: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            if (data.success) { 
                const notification = document.getElementById('notification');
                notification.innerText = `Fidèle enregistré avec succès`;
                notification.style.display = 'block';
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Erreur lors de l'enregistrement du fidèle; Réessayez`;
                notification.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });
});
