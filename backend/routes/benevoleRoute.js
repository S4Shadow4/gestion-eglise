const express= require("express");
const benevoleCtrl= require("../controllers/benevoleController");
infoCtrl = require("../controllers/infoController")
const verify = require("../middleware/verifyjwts")
const router =  express.Router();

router.post("/signup", benevoleCtrl.signup);
router.post("/connexion", benevoleCtrl.login);
router.get("/select",verify,infoCtrl.getInfo)

module.exports = router; 