const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup : {
        type: String,
        required: true
    },
    destination :{
        type : String,
        required: true
    },
    fare : {
        type : Object,
        required: true
    },
    status : {
        type : String,
        enum : ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default : 'pending',
    },
    duration : {
        type : Number
    },
    distance : {
        type : Number,
    },
    paymentId : {
        type : String,
    },
    orderId : {
        type : String,
    },
    Signature : {
        type : String
    },
    otp:{
        type: String,
        select: false,
        required: true
    },
    vehicleType:{
        type: String,
        enum: ["car", "moto","auto"]
    },
    distance:{
        type: String,
        default: ""
    },
    createdAt: { type: Date, default: Date.now, index: { expires: '3h' } }
})

module.exports = mongoose.model('ride', rideSchema)