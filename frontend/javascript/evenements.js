document.addEventListener('DOMContentLoaded', () => {
    const token = window.localStorage.getItem("token");
    console.log(token); 

    const evenementSelect = document.getElementById('evenement');
    
    // Récupérer les événements depuis le serveur
    fetch('http://localhost:5000/reservation/select', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remplir le menu déroulant avec les options récupérées
        data.evenements.forEach(evenement => {
            const option = document.createElement('option');
            option.value = evenement.nom_evenement; // Enregistrer uniquement le nom de l'événement comme valeur

            // Formater la date pour l'affichage
            const date = new Date(evenement.date_evenement);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            option.textContent = `${evenement.nom_evenement} (${formattedDate})`;
            option.dataset.date = formattedDate; // Stocker la date dans l'attribut "data-date"
            evenementSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des événements:', error));
    
    // Soumettre le formulaire
    document.getElementById('evenementForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire
        
        const formData = new FormData(event.target); // Récupérer les données du formulaire
        
        // Envoyer le nom du fidèle et le nom de l'événement au serveur pour enregistrement
        const nomFidele = formData.get('nom');
        const nomEvenement = evenementSelect.value; // Obtenir la valeur sélectionnée dans le menu déroulant
        
        fetch('http://localhost:5000/reservation/submit', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nom_fidele: nomFidele, nom_evenement: nomEvenement }) // Envoyer les noms du fidèle et de l'événement
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Token expiré ou invalide. L'utilisateur sera déconnecté."); 
                    window.localStorage.removeItem("token");
                    window.location.href = "../html/connexion-fidele.html";
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
