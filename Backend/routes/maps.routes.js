const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth.middlewares');
const mapController = require('../controllers/map.controllers')
const {query} = require('express-validator')

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    authentication.authUser, mapController.getCoordinates)

router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}).withMessage('Origin is required'),
    query('destination').isString().isLength({min: 3}).withMessage('Destination is required'),
    authentication.authUser, mapController.getDistanceTime
)

router.get('/get-suggestions', 
    query('input').isString().isLength({min: 3}).withMessage('Provide valid input'),
    authentication.authUser, mapController.getAutoCompleteSuggestions
)




module.exports = router