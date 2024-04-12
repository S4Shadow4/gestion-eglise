document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        const formData = {
            nom: nom,
            date: date,
            description: description
        };

        fetch("http://localhost:5000/addEvenement/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                const notification = document.getElementById('notification');
                notification.innerText = `Evenement enregistré avec success`;
                notification.style.display = 'block';
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Erreur lors de l'enregistrement de l'evenement; Reessayer`;
                notification.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });

});
