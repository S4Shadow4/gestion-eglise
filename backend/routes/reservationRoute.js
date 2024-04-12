const express = require('express');
const router = express.Router();

const verifyFidele = require("../middleware/verifyjwts-fidele");
const reservationController = require('../controllers/reservationController');

router.post('/submit', verifyFidele, reservationController.evenement);
router.get("/select", reservationController.getEvenements);

module.exports = router;
