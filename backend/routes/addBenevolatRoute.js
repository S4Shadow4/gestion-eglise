const express = require('express');

const router = express.Router();
const addBenevolatController = require('../controllers/addBenevolatController');

router.post('/submit', addBenevolatController.addBenevolat);

module.exports = router;
