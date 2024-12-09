import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    createRide: {
        pickup: "",
        destination : "",
        fare: {
            auto: 0,
            car: 0,
            moto: 0
        },
        vehicleType: "",
        status: 'pending',
        userId: ''
    }
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCreateRide : (state, action) =>{
            state.createRide = {
                ...state.createRide, // Retain existing values
                ...action.payload,  // Overwrite with new values from the action payload
              };
        }
    }
})

export const { setUser, setVehicleType, setCreateRide } = userSlice.actions;

export default userSlice.reducer;
