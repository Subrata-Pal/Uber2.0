const {validationResult} = require('express-validator')


const rideService = require('../services/ride.services');
const mapService = require('../services/maps.services')
const axios = require('axios');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination, vehicleType } = req.body;
    console.log(vehicleType)
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};


module.exports.createFare = async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()})
    }

    const {pickup, destination} = req.query;

    try{
        const fare = await rideService.createFare(pickup, destination);
        res.status(201).json({fare});
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({msg: e.message})
    }

}

module.exports.getRidesInformation = async (req, res, next) =>{

    try {
        const information = await rideService.getRidesInformation();
        res.status(201).json({information, success: true});

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}