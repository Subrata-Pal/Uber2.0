import React, { useState, useEffect } from "react";
import { TiLocationOutline } from "react-icons/ti";
import {useSelector, useDispatch} from "react-redux"
import { setCreateRide } from "../features/userSlice";

const LocationSearchPanel = ({ setToggle, setVehiclePanel, suggestions, setPickup, setSuggestions, setDropoff,activeField }) => {

    const [location,setLocation] = useState(null);
    const dispatch = useDispatch();

    // Effect to update setPickup only after the render
    useEffect(() => {
        if (activeField === 'pickup') {
            setPickup(location);  // Update pickup when suggestion is selected
            dispatch(setCreateRide({pickup: location}));
            setSuggestions([])
        }
        else
        {
          setDropoff(location);  // Update dropoff when suggestion is selected
          dispatch(setCreateRide({destination: location}));
            setSuggestions([])
        }

    }, [location, setPickup]);

    const handler = (elem) => {
      setLocation(elem); // Set the selected suggestion

      
    };

    return (
        <div>
            {
                suggestions.length === 0 ? (
                    <div></div>  // Fallback message when suggestions are empty
                ) : (
                    suggestions.map((elem, id) => (
                        <div 
                            key={id} 
                            onClick={() => handler(elem)}  // Pass elem to handler when clicked
                            className="overflow-y-scroll w-[93%] mx-auto flex flex-col gap-4 mb-4 border-gray-100 border-2 p-2 rounded-2xl active:border-black"
                        >
                            <div className="w-full flex items-center justify-start gap-4">
                                <div className="p-2 bg-gray-300 rounded-full flex items-center justify-center">
                                    <TiLocationOutline />
                                </div>
                                <h1 className="font-medium">
                                    {elem}
                                </h1>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default LocationSearchPanel;
