const dataBase = require("../config/mysql");

exports.addBenevolat = (req, res) => {
    const insertBenevolatQuery = "INSERT INTO `benevolat` (nom_benevolat,description_benevolat, date_benevolat) VALUES ( ?, ?, ?)";

    dataBase.query(insertBenevolatQuery, [
        req.body.nom,
        req.body.description,
        req.body.date
    ], (error, result) => {
        if (error) {
            return res.status(401).json(error);
        }
        console.log("Benevolat inséré avec succès");
        return res.status(201).json({ success: true});
    });
};