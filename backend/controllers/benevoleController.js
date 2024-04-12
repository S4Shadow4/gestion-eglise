const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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


exports.signup = (req, res) => {
    console.log(req.body);
    
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            console.log(hash);

            const insertBenevoleQuery = "INSERT INTO `benevole` (username_benevole,nom_benevole, prenom_benevole, age_benevole, sexe_benevole, password_benevole, contact_benevole) VALUES (?, ?, ?, ?, ?, ?, ?)";

            dataBase.query(insertBenevoleQuery, [
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

                console.log("benevole inscrit avec succès");
                //return res.status(201).json({ id: result.insertId });
                return res.status(201).json({ success: true, id: result.insertId });

            });
        })
        .catch((error) => {
            console.error("Error hashing password:", error);
            return res.status(500).json({ error: "Internal Server Error" }); 
        });
};

exports.login = (req, res) => {
    console.log("Requête de connexion reçue:", req.body);

    let selectBenevoleQuery = "SELECT * FROM `benevole` WHERE username_benevole =?";
    dataBase.query(selectBenevoleQuery, [req.body.username], (error, result) => {
        if (error) {
            res.status(500).json(error);
        }
        if (result.length < 1) {
            res.status(401).json(error);
        }
        bcrypt.compare(req.body.password,result[0].password_benevole)
            .then(valid=>{
                if(!valid){
                    res.status(400).end();
                }
                let accessToken = jwt.sign(
                    {
                        benevole_id: result[0].benevole_id
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
