const express = require('express');
const { getVehicleData } = require('../controllers/vehicleController');

const router = express.Router();

router.get('/data', getVehicleData);

module.exports = router;
