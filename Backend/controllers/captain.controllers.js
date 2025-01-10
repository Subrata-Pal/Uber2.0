const captainModel = require('../models/captain.models');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklistToken.models');

module.exports.registerUser = async function(req, res, next){

    const {fullname: {firstname, lastname}, email, password, vehicle: {color, plateNumber, capacity, vehicleType}} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    if(!firstname || !email || !password)
    {
        return res.status(400).json({msg: "All fields are required", success: false});
    }

    const existingUser = await captainModel.findOne({email}).select('+password');
    if(existingUser)
    {
        return res.status(400).json({msg: "User already exists", success: false});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    try{
        const user = await captainModel.create({fullname: {firstname, lastname}, email, password: hashedPassword, vehicle : {color, plateNumber, capacity, vehicleType}});
        res.status(201).json({msg: "User registered successfully", success: true});
    }
    catch(e)
    {
        console.log("Something went wrong while registering user ", e);
        return res.status(500).json({msg: "Internal server error", success: false});
    }
}

module.exports.loginUser = async function(req, res, next){

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(400).json({
            msg: "All the fields are required",
            success: false
        })
    }

    try{
        const user = await captainModel.findOne({email}).select('+password');
        if(!user)
        {
            return res.status(400).json({msg: "Invalid email or password", success: false});
        }

        const isMatch = await user.comparePassword(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({msg: "Invalid email or password", success: false});
        }

        const token = await user.generateToken();
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({msg: "Logged in successfully", token, user, success: true});
    }
    catch(e)
    {
        console.log("Something went wrong while logging in user ", e);
        return res.status(500).json({msg: "Internal server error", success: false});
    }

}

module.exports.getProfile = async function(req, res, next){

    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if(!token)
    {
        return res.status(401).json({msg: "Unauthorized", success: false});
    }

    const blacklistToken = await blacklistTokenModel.findOne({token});
    if(blacklistToken)
    {
        return res.status(401).json({msg: "Unauthorized", success: false});
    }

    try{        
        const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await captainModel.findById(decoded._id).select('+password');
        res.status(200).json({user, success: true});
    }
    catch(e)
    {
        console.log("Something went wrong while getting profile ", e);
        return res.status(500).json({msg: "Internal server error", success: false});
    }

}

module.exports.logoutUser = async function(req, res, next){

    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');     

    if(!token)
    {
        return res.status(401).json({msg: "Unauthorized", success: false});
    }

    try{
        await blacklistModel.create({token});
        res.clearCookie('token');
        res.status(200).json({msg: "Logged out successfully", success: true});
    }
    catch(e)
    {
        console.log("Something went wrong while logging out user ", e);
        return res.status(500).json({msg: "Internal server error", success: false});
    }

}
