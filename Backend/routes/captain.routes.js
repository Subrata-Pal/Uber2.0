const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const captainController = require('../controllers/captain.controllers');

router.post('/register', 
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be atleast 3 character long'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long'),
    body('fullname').isLength({min: 3}).withMessage('Full name must be atleast 3 character long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be atleast 3 character long'),
    body('vehicle.plateNumber').isLength({min: 3}).withMessage('Plate number must be atleast 3 character long'),
    body('vehicle.capacity').isInt({min: 1}).isInt({max: 6}).withMessage('Capacity must be atleast 1 and maximum 6'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type'),
    captainController.registerUser)


router.post('/login', 
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long'),
    captainController.loginUser);

router.get('/profile', captainController.getProfile);

router.get('/logout', captainController.logoutUser);

module.exports = router;