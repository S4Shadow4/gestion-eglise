const express= require("express");
const fideleCtrl= require("../controllers/fideleController");
infoCtrl = require("../controllers/infoController")
const verify = require("../middleware/verifyjwts-fidele")
const router =  express.Router();

router.post("/signup", fideleCtrl.signup);
router.post("/connexion", fideleCtrl.login);
router.get("/select",verify,infoCtrl.getInfo)

module.exports = router; 