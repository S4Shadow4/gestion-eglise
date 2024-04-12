const express = require('express');

const router = express.Router();
const addEvenementController = require('../controllers/addEvenementController');

router.post('/submit', addEvenementController.addEvenement);

module.exports = router;
