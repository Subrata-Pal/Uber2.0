const userModel = require('../models/user.models');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.models');

module.exports.registerUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname: {firstname, lastname}, email, password} = req.body;

    const existingUser = await userModel.findOne({email}).select('+password');
    if(existingUser)
    {
        return res.status(401).json({message: "User already exists"});
    }


    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({firstname, lastname, email, password: hashedPassword});

    res.status(201).json({message: "User created successfully", user, success: true});
}

module.exports.loginUser = async(req, res, next) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const user = await userService.findUser({email, password})

    if(!user)
    {
    return res.status(400).json({
        msg: "Email or password is incorrect",
        success: false
    })
    }
    
    const ismatch = await user.comparePassword(password);
    if(!ismatch)
    {
        return res.status(400).json({
            msg: "Email or password is incorrect",
            success: false
        })
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    
    res.status(201).json({
        msg: "Logged in successfully",
        user,
        token, 
        success : true
    });
    
}

module.exports.getProfile = async(req, res, next) =>{
    res.json({
      user:  req.user,
    });
}

module.exports.logoutUser = async(req, res, next) =>{
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    res.clearCookie('token');

    try{
        await blacklistTokenModel.create({token});
    }
    catch(e)
    {
        return res.status(500).json({msg: "Internal server error", success: false});
    }

    res.status(200).json({msg: "Logged out successfully", success: true});
}

