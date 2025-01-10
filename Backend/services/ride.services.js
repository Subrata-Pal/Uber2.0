const rideModel = require('../models/ride.models');
const userModel = require('../models/user.models');
const mapServices = require('../services/maps.services');
const crypto = require('crypto');
module.exports.createRide = async ({user,pickup,destination,vehicleType, otp}) =>{

    if(!user ||!pickup ||!destination ||  !vehicleType)
    {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare,
        otp : getOtp(6),
        vehicleType
    })

    return ride;
}


async function getFare(pickup, destination){

    if(!pickup || !destination)
    {
        throw new Error(' pickup and destination is required');
    }

    const distanceTime = await mapServices.getDistanceTime(pickup, destination);
    

    
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 6
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;

}


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createFare = async (pickup, destination) =>{
    if(!pickup ||!destination)
        {
            throw new Error('All fields are required');
        }
    
    const fare = await getFare(pickup, destination);

    return fare
}

module.exports.getRidesInformation = async () =>{

    try{
    const rideInformation = await rideModel.find();
    return rideInformation
    }
    catch(err)
    {
        console.log(err);
        throw new err;
    }
}