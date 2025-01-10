const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const userController = require('../controllers/user.controllers');
const authentication = require('../middlewares/auth.middlewares');

router.post('/register', 
    body('email').isEmail().isLength({min: 5}).withMessage('Email is invalid'),
    body('fullname.firstname').isLength({min: 3}).withMessage('firstname must be atleast 3 characters long'),
    body('password').isLength({min: 5}).withMessage('Password must be atleast 5 character long'),
    userController.registerUser
)

router.post('/login', 
    body('email').isEmail().isLength({min: 5}).withMessage('Email is invalid'),
    body('password').isLength({min: 5}).withMessage('Password must be atleast 5 character long'),
    userController.loginUser
)

router.get('/profile', authentication.authUser, userController.getProfile)

router.get('/logout', userController.logoutUser)

module.exports = router;