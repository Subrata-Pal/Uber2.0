const axios = require('axios');

module.exports.getAddressCoordinates = async (address)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try{
        const res = await axios.get(url);
        if(res.data.status === 'OK')
        {
            const location = res.data.results[0].geometry.location;
            console.log(location)
            return {
                ltd:location.lat,
                lng: location.lng
            }
        }
        else{
            throw new Error('Unable to fetch Coordinates');
        }
    }
    catch(e)
    {
        console.error(error);
        throw error;
    }

}

module.exports.getDistanceTime = async (origin, destination)=>{

    if(!origin || !destination)
    {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
 
    try{
        const res = await axios.get(url);
 
        if(res.data.status === 'OK')
        {
            const location = res.data.rows[0].elements[0];

            if(location.status === 'ZERO_RESULTS')
            {
                throw new Error('No results found for given address');
            }

            return location;
            
        }
        else{
            throw new Error('Unable to fetch distance and time');
        }
    }
    catch(e)
    {
        console.error(error);
        throw error;
    }

}

module.exports.getAutoCompleteSuggestions = async (input)=>{

    if(!input)
    {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    console.log(url)
    try{
        const response = await axios.get(url);
    
        if(response.data.status === 'OK')
        {
            const result = response.data.predictions.map((prediction) => prediction.description).filter((value) => value);
            return result;
        }
        else
        {
            throw new Error("Unable to fetch Suggestions")
        }
    }
    catch(e)
    {
        console.error(error);
        throw error;
    }

}