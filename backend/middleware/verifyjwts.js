const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.headers["authorization"].split(" ")[1];
        let verifiedToken = jwt.verify(token, "bRODJI04#");
        req.id_benevole = verifiedToken.benevole_id;
        next();
    } catch (error) {
        console.error("Error in verifyjwts middleware:", error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token has expired' });
        } else { 
            res.status(403).json(error);
        }
    }
}; 