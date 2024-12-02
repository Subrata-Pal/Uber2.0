import React from "react";
import { TiLocationOutline } from "react-icons/ti";

const LocationSearchPanel = ({setToggle, setVehiclePanel}) => {

    let arr = [1, 2 , 3, 4]

    const handler = ()=>{
        setVehiclePanel(true);
        setToggle(false);
    }
  return (
    <div>

    {
       arr.map((elem, id)=>
        (<div key={id} onClick={handler} className="w-[93%] mx-auto flex flex-col gap-4 mb-4 border-gray-100 border-2 p-2 rounded-2xl active:border-black">
            <div className="w-full flex items-center justify-start gap-4">
              <div className="p-2 bg-gray-300 rounded-full flex items-center justify-center">
                <TiLocationOutline />
              </div>
              <h1 className=" font-medium">
                93B, Jalan Tun Razak, 50400 Kuala Lumpur, Wilayah Persekutuan Kuala
                Lumpur
              </h1>
            </div>
          </div>)) 
    }
    </div>
  );
};

export default LocationSearchPanel;
