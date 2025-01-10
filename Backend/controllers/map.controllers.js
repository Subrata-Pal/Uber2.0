const mapService = require('../services/maps.services');
const {validationResult} = require('express-validator') 

module.exports.getCoordinates = async(req, res, next) =>{
    const {address} = req.query;


    const errors = validationResult(req);

    if(!errors)
    {
        return res.status(400).json({errors: errors.array()});
    }


    try{
        
    
        const coordinate = await mapService.getAddressCoordinates(address);
        
        res.status(200).json(coordinate);
    }
    catch(error)
    {
        res.status(404).json({msg: "Coordinates not found"});
    }
}

module.exports.getDistanceTime = async(req, res, next) =>{
    const {origin, destination} = req.query;


    const errors = validationResult(req);

    if(!errors)
    {
        return res.status(400).json({errors: errors.array()});
    }


    try{
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        
        res.status(200).json(distanceTime);
    }
    catch(error)
    {
        res.status(404).json({msg: "Coordinates not found"});
    }
}

module.exports.getAutoCompleteSuggestions = async(req, res, next) => {  

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        
        const {input} = req.query;
        const response = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(response);
    }
    catch(error)
    {
        res.status(404).json({msg: "suggestions not found"});
    }
}