const dataBase = require("../config/mysql");


exports.verifyToken = (req,res,next) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, 'bRODJI04#');
        req.userData = {benevoleId: decodedToken.benevole_id };
        next();
    } catch (error){
        return res.status(401).json({message: 'Authentification échouée'}) 
    }
};

exports.verifyToken = (req,res,next) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, 'bRODJI04#');
        req.userData = {fideleId: decodedToken.fidele_id };
        next();
    } catch (error){
        return res.status(401).json({message: 'Authentification échouée'})
    }
};




exports.benevolat = (req, res) => {
    // Récupérer l'ID du bénévole en fonction de son nom
    const selectBenevoleQuery = "SELECT id_benevole FROM benevole WHERE nom_benevole = ?";
    dataBase.query(selectBenevoleQuery, [req.body.nom_benevole], (error, result) => {
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        const idBenevole = result[0].id_benevole;

        // Récupérer l'ID du bénévolat en fonction de son nom
        const selectBenevolatQuery = "SELECT id_benevolat FROM benevolat WHERE nom_benevolat = ?";
        dataBase.query(selectBenevolatQuery, [req.body.nom_benevolat], (error, result) => {
            if (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
            const idBenevolat = result[0].id_benevolat;

            // Insérer l'entrée dans la table reservation_benevolat_benevole
            const insertReservationQuery = "INSERT INTO reservation_benevolat_benevole (id_benevole, id_benevolat) VALUES (?, ?)";
            dataBase.query(insertReservationQuery, [idBenevole, idBenevolat], (error, result) => {
                if (error) {
                    return res.status(400).json({ success: false, error: error.message });
                }
                console.log("Réservation bénévolat-bénévole insérée avec succès");
                return res.status(201).json({ success: true, message: "Réservation bénévolat-bénévole ajoutée avec succès" });
            });
        });
    });
};
  

exports.benevolatFidele = (req, res) => {
    // Récupérer l'ID du fidèle en fonction de son nom
    const selectFideleQuery = "SELECT id_fidele FROM fidele WHERE nom_fidele = ?";
    dataBase.query(selectFideleQuery, [req.body.nom_fidele], (error, result) => {
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        const idFidele = result[0].id_fidele;

        // Récupérer l'ID du bénévolat en fonction de son nom
        const selectBenevolatQuery = "SELECT id_benevolat FROM benevolat WHERE nom_benevolat = ?";
        dataBase.query(selectBenevolatQuery, [req.body.nom_benevolat], (error, result) => {
            if (error) {
                return res.status(400).json({ success: false, error: error.message });
            }
            const idBenevolat = result[0].id_benevolat;

            // Insérer l'entrée dans la table reservation_benevolat_fidele
            const insertReservationQuery = "INSERT INTO reservation_benevolat_fidele (id_fidele, id_benevolat) VALUES (?, ?)";
            dataBase.query(insertReservationQuery, [idFidele, idBenevolat], (error, result) => {
                if (error) {
                    return res.status(400).json({ success: false, error: error.message });
                }
                console.log("Réservation bénévolat-fidèle insérée avec succès");
                return res.status(201).json({ success: true, message: "Réservation bénévolat-fidèle ajoutée avec succès" });
            });
        });
    });
};
 


exports.getBenevolat = (req, res) => {
    const selectBenevolatQuery = "SELECT * FROM benevolat";

    dataBase.query(selectBenevolatQuery, (error, result) => { 
        if (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
        console.log("Bénévolats récupérés avec succès");
        return res.status(200).json({ success: true, benevolats: result });
    });
};
