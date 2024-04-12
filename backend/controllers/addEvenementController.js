const dataBase = require("../config/mysql");

exports.addEvenement = (req, res) => {
    const insertEvenementQuery = "INSERT INTO `evenements` (nom_evenement, date_evenement, description_evenement) VALUES ( ?, ?, ?)";

    dataBase.query(insertEvenementQuery, [
        req.body.nom,
        req.body.date,
        req.body.description
    ], (error, result) => {
        if (error) {
            return res.status(401).json(error);
        }
        console.log("Evenement inséré avec succès");
        return res.status(201).json({ success: true});
    });
};