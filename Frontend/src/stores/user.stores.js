import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import captainReducer from "../features/captainSlice";

export const store = configureStore({
    reducer: {
        userData: userReducer,
        captainData : captainReducer
    },
})

