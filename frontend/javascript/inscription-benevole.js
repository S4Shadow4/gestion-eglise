document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const userName = document.getElementById('userName').value;
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const password = document.getElementById('password').value;
        const contact = document.getElementById('contact').value;

        const formData = {
            userName: userName,
            lastName: lastName,
            firstName: firstName,
            age: age,
            gender: gender,
            password: password,
            contact: contact
        };

        fetch("http://localhost:5000/benevole/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.localStorage.setItem("lastName", formData.lastName);
            if (data.success) { // Assurez-vous que le serveur renvoie un indicateur de succès
                window.location.href = '../html/connexion-benevole.html';
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Veuillez vérifier la validité des informations entrées et éviter de vous réinscrire.`;
                notification.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });
});
