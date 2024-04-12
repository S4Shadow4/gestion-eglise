document.addEventListener('DOMContentLoaded', () => {

const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');
const commandesLink = document.getElementById('Commandes');
const reservationsLink = document.querySelector('a[href="#"]:nth-child(2)');
const reservationsTableBody = document.getElementById('reservationsTableBody');
const commandesTableBody = document.getElementById('commandeTableBody');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});
    const token = window.localStorage.getItem("token");
    console.log(token);

    fetch("http://localhost:5000/gerant/select", {
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
                
                window.location.href = "../html/admin-auth.html";
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
    })

    // Fonction pour récupérer et afficher les identifiants des fidèles
    const fetchIdentifiantsFideles = () => {
        fetch("http://localhost:5000/gerant/identifiant-fidele")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.utilise}</td>
                        <td>${item.date_ajout}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des identifiants des fidèles:", error));
    };

    // Associer l'écouteur d'événement au lien des identifiants des fidèles
    const identifiantsFidelesLink = document.querySelector('a[href="#"]:nth-child(4)');
    identifiantsFidelesLink.addEventListener('click', fetchIdentifiantsFideles);

    /*

    // Fonction pour récupérer et afficher les informations sur les fidèles
    const fetchFidelesInformation = () => {
        fetch("http://localhost:5000/gerant/Fidele")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_fidele}</td>
                        <td>${item.username_fidele}</td>
                        <td>${item.nom_fidele}</td>
                        <td>${item.age_fidele}</td>
                        <td>${item.sexe_fidele}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur les fidèles:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur les fidèles
    const fidelesLink = document.querySelector('a[href="#"]:nth-child(5)');
    fidelesLink.addEventListener('click', fetchFidelesInformation);

    // Code existant...

    // Fonction pour récupérer et afficher les informations sur les bénévoles
    const fetchBenevolesInformation = () => {
        fetch("http://localhost:5000/gerant/Benevoles")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_benevole}</td>
                        <td>${item.username_benevole}</td>
                        <td>${item.nom_benevole}</td>
                        <td>${item.age_benevole}</td>
                        <td>${item.sexe_benevole}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur les bénévoles:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur les bénévoles
    const benevolesLink = document.querySelector('a[href="#"]:nth-child(6)');
    benevolesLink.addEventListener('click', fetchBenevolesInformation);

    // Code existant...

    // Fonction pour récupérer et afficher les informations sur le bénévolat
    const fetchBenevolatInformation = () => {
        fetch("http://localhost:5000/gerant/Benevolat")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_benevolat}</td>
                        <td>${item.nom_benevolat}</td>
                        <td>${item.date_benevolat}</td>
                        <td>${item.description_benevolat}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur le bénévolat:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur le bénévolat
    const benevolatLink = document.querySelector('a[href="#"]:nth-child(7)');
    benevolatLink.addEventListener('click', fetchBenevolatInformation);

    // Code existant...

    // Fonction pour récupérer et afficher les informations sur les événements
    const fetchEvenementsInformation = () => {
        fetch("http://localhost:5000/gerant/Evenements")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_evenement}</td>
                        <td>${item.nom_evenement}</td>
                        <td>${item.date_evenement}</td>
                        <td>${item.description_evenement}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur les événements:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur les événements
    const evenementsLink = document.querySelector('a[href="#"]:nth-child(6)');
    evenementsLink.addEventListener('click', fetchEvenementsInformation);

    // Code existant...

    // Fonction pour récupérer et afficher les informations sur le bénévolat associé aux bénévoles
    const fetchBenevolatBenevolesInformation = () => {
        fetch("http://localhost:5000/gerant/BenevolatBenevoles")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_benevole}</td>
                        <td>${item.id_benevolat}</td>
                        <td>${item.date_reservation}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur le bénévolat associé aux bénévoles:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur le bénévolat associé aux bénévoles
    const benevolatBenevolesLink = document.querySelector('a[href="#"]:nth-child(7)');
    benevolatBenevolesLink.addEventListener('click', fetchBenevolatBenevolesInformation);

    // Code existant...

    // Fonction pour récupérer et afficher les informations sur le bénévolat associé aux fidèles
    const fetchBenevolatFidelesInformation = () => {
        fetch("http://localhost:5000/gerant/BenevolatFideles")
            .then(response => response.json())
            .then(data => {
                reservationsTableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id_fidele}</td>
                        <td>${item.id_benevolat}</td>
                        <td>${item.date_reservation}</td>
                    `;
                    reservationsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Erreur lors de la récupération des informations sur le bénévolat associé aux fidèles:", error));
    };

    // Associer l'écouteur d'événement au lien des informations sur le bénévolat associé aux fidèles
    const benevolatFidelesLink = document.querySelector('a[href="#"]:nth-child(8)');
    benevolatFidelesLink.addEventListener('click', fetchBenevolatFidelesInformation);

    // Code existant... */



});