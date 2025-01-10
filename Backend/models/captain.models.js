const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname :{
        firstname : {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 character long"],
        },
        lastname : {
            type: String,
            minlength: [3, "Last name must be atleast 3 character long"],
        }
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: true,
        select: false,
    },
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive',
    },
    vehicle : {
        color :{
            type : String,
            required : true,
            minlength : [3, "Color must be atleast 3 character long"],
        },
        plateNumber : {
            type : String,
            required : true,
            minlength : [3, "Plate number must be atleast 3 character long"],
        },
        capacity:{
            type : Number,
            required : true,
            min : [1, "Capacity must be atleast 1"],
        },
        vehicleType :{
            type : String,
            required : true,    
            enum : ['car', 'bike', 'auto'],
        }
    },
    location : {
        longitude : {
            type : Number,
        },
        latitude : {
            type : Number,
        }
    },
})


captainSchema.methods.generateToken = async function()
{
    const token = await jwt.sign({_id : this._id}, process.env.PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

captainSchema.methods.comparePassword = async function(password)
{
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model('captain', captainSchema);