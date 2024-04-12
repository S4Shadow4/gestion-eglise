const express= require("express");
const gerantCtrl= require("../controllers/gerantController");
infoCtrl = require("../controllers/infoController");
const verifyGerant = require("../middleware/verifyjwts-gerant")

const router =  express.Router();


router.post("/signup", gerantCtrl.signup);
router.post("/connexion", gerantCtrl.login); 
router.get("/select",verifyGerant,infoCtrl.getInfo);
router.get("/identifiant-fidele",gerantCtrl.identifiantFideles);
router.get("/Fidele",gerantCtrl.Fideles);
router.get("/Benevoles",gerantCtrl.Benevoles);
router.get("/Benevolat",gerantCtrl.Benevolat);
router.get("/Evenements",gerantCtrl.Evenements);
router.get("/BenevolatBenevoles",gerantCtrl.BenevolatBenevoles);
router.get("/BenevolatFideles",gerantCtrl.BenevolatFideles);


/* router.get("/informations", gerantCtrl.getInformations);  */
module.exports = router;            
