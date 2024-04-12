document.addEventListener('DOMContentLoaded', () => {
    const token = window.localStorage.getItem("token");
    console.log(token); 

    const benevolatSelect = document.getElementById('benevolat');
    
    // Récupérer les bénévolats depuis le serveur
    fetch('http://localhost:5000/benevolat/select', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remplir le menu déroulant avec les options récupérées
        data.benevolats.forEach(benevolat => {
            const option = document.createElement('option');
            option.value = benevolat.nom_benevolat; // Enregistrer uniquement le nom du bénévolat comme valeur

            // Formater la date pour l'affichage
            const date = new Date(benevolat.date_benevolat);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            option.textContent = `${benevolat.nom_benevolat} (${formattedDate})`;
            option.dataset.date = formattedDate; // Stocker la date dans l'attribut "data-date"
            benevolatSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des bénévolats:', error));
    
    // Soumettre le formulaire
    document.getElementById('benevolatForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire
        
        const formData = new FormData(event.target); // Récupérer les données du formulaire
        
        // Envoyer le nom du fidèle et le nom du bénévolat au serveur pour enregistrement
        const nomFidele = formData.get('nom');
        const nomBenevolat = formData.get('benevolat');
        fetch('http://localhost:5000/benevolat/insert', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nom_fidele: nomFidele, nom_benevolat: nomBenevolat }) // Envoyer les noms du fidèle et du bénévolat
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Token expiré ou invalide. L'utilisateur sera déconnecté."); 
                    window.localStorage.removeItem("token");
                    window.location.href = "../html/connexion-benevole.html";
                } else {
                    console.error(`Erreur serveur: ${response.status}`);
                    console.log("Détails de la réponse:", response);
                    throw new Error(`Erreur serveur: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            // Traiter la réponse du serveur
            console.log(data);
            // Réinitialiser le formulaire après soumission réussie
            event.target.reset();
        })
        .catch(error => console.error('Erreur lors de la soumission du formulaire:', error));
    });
});
