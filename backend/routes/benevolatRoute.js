const express = require('express');
const router = express.Router();
const benevolatController = require('../controllers/benevolatController');
const verifyBenevole = require("../middleware/verifyjwts")
const verifyFidele = require("../middleware/verifyjwts-fidele")

router.post('/submit', verifyBenevole, benevolatController.benevolat);
router.post('/insert', verifyFidele, benevolatController.benevolatFidele);
router.get("/select", benevolatController.getBenevolat);

module.exports = router;
