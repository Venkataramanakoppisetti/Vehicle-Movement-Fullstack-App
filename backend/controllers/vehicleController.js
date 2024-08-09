const vehicleData = require('../data/vehicleData.json');
 
const getVehicleData = (req, res) => {
    res.json(vehicleData);
}

module.exports = {getVehicleData};