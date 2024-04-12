document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const nom = document.getElementById('nom').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        const formData = {
            nom: nom,
            description: description,
            date: date
        };

        fetch("http://localhost:5000/addBenevolat/submit", {
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
                notification.innerText = `Benevolat enregistré avec success`;
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 4000);
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Erreur lors de l'enregistrement du benevolat, Reessayer`;
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 4000);
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });

});
