import { configureStore } from "@reduxjs/toolkit";
import captainReducer from "../features/captainSlice";

export const store = configureStore({
    reducer: {
        captainData: captainReducer,
    },
})

