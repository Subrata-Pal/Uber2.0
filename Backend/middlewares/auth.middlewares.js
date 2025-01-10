const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');
const blacklistTokenModel = require('../models/blacklistToken.models');

module.exports.authUser = async(req, res, next) =>{
    const token = req.cookies.token || req.header("Authorization")?.replace("bearer ", "");

    if(!token)
    {
        return res.status(401).json({msg: "Unauthorized", success: false});
    }

    const blacklistToken = await blacklistTokenModel.findOne({token});
    if(blacklistToken)
    {
        return res.status(401).json({msg: "Unauthorized", success: false});
    }

    const decode = jwt.verify(token, process.env.PRIVATE_KEY);

    try{
        
        const user = await userModel.findById(decode._id).select('+password');
        
    req.user = user;
    next();  
    }
    catch(e)
    {
        return res.status(401).json({msg: "Request not authorized", success: false});
    }
};