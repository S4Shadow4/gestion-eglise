const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


exports.signup = (req, res) => {
    console.log(req.body);

    const selectIdentifiantQuery = "SELECT * FROM identifiants_fideles WHERE identifiant = ?";
    dataBase.query(selectIdentifiantQuery, [req.body.userId], (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (result.length === 0) {

            return res.status(401).json({ error: "Identifiant non trouvé" });
        } else if (result[0].utilise === 1) {

            return res.status(401).json({ error: "Identifiant déjà utilisé" });
        } else {
            bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    console.log(hash);

                    const insertFideleQuery = "INSERT INTO `fidele` (username_fidele,nom_fidele, prenom_fidele, age_fidele, sexe_fidele, password_fidele, contact_fidele) VALUES (?, ?, ?, ?, ?, ?, ?)";

                    dataBase.query(insertFideleQuery, [
                        req.body.userName,
                        req.body.lastName,
                        req.body.firstName,
                        req.body.age,
                        req.body.gender,
                        hash,
                        req.body.contact
                    ], (error, result) => {
                        if (error) {
                            return res.status(401).json(error);
                        }

                        console.log("Fidèle inscrit avec succès");

                        const updateIdentifiantQuery = "UPDATE identifiants_fideles SET utilise = 1 WHERE identifiant = ?";
                        dataBase.query(updateIdentifiantQuery, [req.body.userId], (error, result) => {
                            if (error) {
                                return res.status(500).json(error);
                            }
                            console.log("Statut d'utilisation de l'identifiant mis à jour avec succès");
                        });

                        return res.status(201).json({ success: true, id: result.insertId });
                    }); 
                })
                .catch((error) => {
                    console.error("Erreur lors du hachage du mot de passe :", error);
                    return res.status(500).json({ error: "Erreur interne du serveur" });
                });
        }
    });
};




exports.login = (req, res) => {
    console.log("Requête de connexion reçue:", req.body);

    let selectFideleQuery = "SELECT * FROM `fidele` WHERE username_fidele =?";
    dataBase.query(selectFideleQuery, [req.body.username], (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        if (result.length < 1) {
            res.status(401).json(error);
        }
        bcrypt.compare(req.body.password,result[0].password_fidele)
            .then(valid=>{
                if(!valid){
                    res.status(400).end();
                }
                let accessToken = jwt.sign(
                    {
                        fidele_id: result[0].fidele_id
                    },
                    "bRODJI04#",
                    {expiresIn: "30min"}
                );
                res.status(200).json({token: accessToken, username:result[0].username})
            })
            .catch(error=>{
                res.status(500).end();
            }) 
           
    });
};
