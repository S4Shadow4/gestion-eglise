const dataBase = require("../config/mysql");


exports.verifyToken = (req,res,next) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, 'bRODJI04#');
        req.userData = {gerantId: decodedToken.gerant_id };
        next();
    } catch (error){
        return res.status(401).json({message: 'Authentification échouée'})
    }
};

exports.addFidele = (req, res) => {
    const insertFideleQuery = "INSERT INTO identifiants_fideles (nom_fidele, prenom_fidele) VALUES (?, ?)";

    dataBase.query(insertFideleQuery, [
        req.body.nom,
        req.body.prenom
    ], (error, result) => {
        if (error) {
            return res.status(401).json(error);
        }
        console.log("Fidèle inséré avec succès");
        return res.status(201).json({ success: true });
    });
};
