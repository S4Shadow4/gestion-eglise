const express = require('express');

const router = express.Router();
const addFideleController = require('../controllers/addFideleController');
const verifyGerant = require("../middleware/verifyjwts-gerant")

router.post('/submit', verifyGerant,addFideleController.addFidele);

module.exports = router;
