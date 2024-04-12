const dataBase = require("../config/mysql");


const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try { 
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, 'bRODJI04#');
        req.userData = { fideleId: decodedToken.fidele_id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentification échouée' });
    }
};



exports.evenement = (req, res) => {

    const { nom_fidele, nom_evenement } = req.body;

    // Récupérer l'ID du fidèle à partir de son nom
    const selectFideleQuery = "SELECT id_fidele FROM fidele WHERE nom_fidele = ?";
    dataBase.query(selectFideleQuery, [nom_fidele], (error, fideleResult) => {
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        const fideleId = fideleResult[0].id_fidele;

        // Récupérer l'ID de l'événement à partir de son nom
        const selectEvenementQuery = "SELECT id_evenement FROM evenements WHERE nom_evenement = ?";
        dataBase.query(selectEvenementQuery, [nom_evenement], (error, evenementResult) => {
            if (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
            const idEvenement = evenementResult[0].id_evenement;

            // Insérer la réservation dans la table reservations_fidele
            const insertReservationQuery = "INSERT INTO reservations_fidele (id_fidele, id_evenement, nom_evenement) VALUES (?, ?, ?)";
            dataBase.query(insertReservationQuery, [fideleId, idEvenement, nom_evenement], (error, result) => {
                if (error) {
                    return res.status(400).json({ success: false, error: error.message });
                }
                console.log("Réservation d'événement ajoutée avec succès");
                return res.status(201).json({ success: true, message: "Réservation d'événement ajoutée avec succès" });
            });
        });
    });
};



exports.getEvenements = (req, res) => {
    const selectEvenementQuery = "SELECT * FROM evenements";

    dataBase.query(selectEvenementQuery, (error, result) => { 
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        console.log("Événements récupérés avec succès");
        return res.status(200).json({ success: true, evenements: result });
    });
};
