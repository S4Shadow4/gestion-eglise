const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.identifiantFideles = (req, res) => {
    const query = "SELECT id_fidele, nom_fidele, prenom_fidele, utilise, date_ajout FROM `fideles`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.Fideles = (req, res) => {
    const query = "SELECT * FROM `fideles`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.Benevoles = (req, res) => {
    const query = "SELECT * FROM `benevoles`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.Benevolat = (req, res) => {
    const query = "SELECT * FROM `benevolat`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.Evenements = (req, res) => {
    const query = "SELECT * FROM `evenements`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.BenevolatBenevoles = (req, res) => {
    const query = "SELECT * FROM `benevolat_benevoles`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};

exports.BenevolatFideles = (req, res) => {
    const query = "SELECT * FROM `benevolat_fideles`";
    dataBase.query(query, (error, results) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(results);
    });
};



exports.verifyToken = (req,res,next) =>{
    try{
        const accessToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(accessToken, 'bRODJI04#');
        req.userData = {gerantId: decodedToken.gerant_id };
        next();
    } catch (error){
        console.error("Error in verifyToken middleware:", error);
        
        // Ajout pour faciliter le débogage : affiche le token reçu dans le header
        console.log("Received token:", req.headers.authorization);

        return res.status(401).json({message: 'Authentification échouée'})
    }
}; 

exports.signup = (req, res) => {
    const checkExistingGerantQuery = "SELECT * FROM `gerants` WHERE nom_gerant = ? AND prenom_gerant = ?";
    
    dataBase.query(checkExistingGerantQuery, [req.body.lastName, req.body.firstName], (checkError, checkResults) => {
        if (checkError) {
            return res.status(500).json(checkError);
        }

        if (checkResults.length > 0) {
            return res.status(409).json({ error: "Le gérant existe déjà dans la base de données." });
        } else {
            bcrypt.hash(req.body.password,10)
            .then((hash)=>{
                console.log(hash);
                const insertGerantQuery = "INSERT INTO `gerants` (username_gerants,nom_gerant, prenom_gerant, age_gerant, sexe_gerant, password_gerant, contact_gerant) VALUES (?, ?, ?, ?, ?, ?, ?)";

                dataBase.query(insertGerantQuery, [
                    req.body.userName,
                    req.body.lastName,
                    req.body.firstName,
                    req.body.age,
                    req.body.gender,
                    hash,
                    req.body.contact
                ], (insertError, result) => {
                    if (insertError) {
                        return res.status(401).json(insertError);
                    }
                    console.log("Gérant inscrit avec succès");
                    return res.status(201).json({ success: true, id: result.insertId });
                });
            })
            .catch((error)=>{
                console.error("Error hashing password:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            });
            
        };
    });
};

exports.login = (req, res) => {
    console.log("Requête de connexion reçue:", req.body);

    let selectGerantQuery = "SELECT * FROM `gerants` WHERE username_gerants =?";
    dataBase.query(selectGerantQuery, [req.body.username], (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        if (result.length < 1) {
            res.status(401).json(error);
        }
        bcrypt.compare(req.body.password,result[0].password_gerant)
            .then(valid=>{
                if(!valid){
                    res.status(400).end();
                }
                let accessToken = jwt.sign(
                    {
                        gerant_id: result[0].gerant_id
                    },
                    "bRODJI04#",
                    {expiresIn: "30min"}
                );
                res.status(200).json({token: accessToken, username:result[0].username});
            })
            .catch(error=>{
                res.status(500).end();
            })
    });
};
