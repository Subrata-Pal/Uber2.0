import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rideDetails: {
        pickup: "",
        destination: "",
        vehicleType: "",
        fare:  {
            car: "",
            moto: "",
            auto:  ""
        },
        firstname: "",
        lastname:  "",
        user: "",
        status: ""
    }
}


export const captainSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRideDetails : (state, action) =>{
            state.rideDetails = {
                ...state.rideDetails, // Retain existing values
                ...action.payload,  // Overwrite with new values from the action payload
              };
        },
        resetRideDetails: (state) => {
            state.rideDetails = initialState.rideDetails; // Reset to default values
          },
    }
})

export const { setRideDetails,  resetRideDetails} = captainSlice.actions;

export default captainSlice.reducer;
