const userModel = require('../models/user.models');


module.exports.createUser = async ({firstname, lastname, email, password}) =>{

    if(!firstname || !email || !password)
    {
        throw new Error("All fields are required");
    }
    

    try{
        const user = await userModel.create({
            fullname :{
                firstname,
                lastname
            },
            email,
            password
        })

        return user;
    }
    catch(e)
    {
        console.log("Error occured while creating user ", e);
    }
}

module.exports.findUser = async function({email, password})
{
    if(!email || !password)
    {
        throw new Error("All fields are required");
    }

    try{
        const user = await userModel.findOne({email}).select('+password');
        return user
    }
    catch(e)
    {
        console.log("Error while finding user ", e)
    }
}