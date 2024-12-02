import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";

const ConfirmPanel = ({setConfirmPanel, setDriverPanel, setLookingPanel, setVehiclePanel}) => {
    return (
        <div>
             <div className=" relative m-0 p-0 w-full mx-auto">
            <div onClick = {()=> {setConfirmPanel(false)
                setVehiclePanel(true)
            }} className=" bg-slate-500 w-14 h-1 absolute -top-6 left-40 "></div>
    
            <div className="w-screen flex flex-col pl-0 mt-8 p-2 rounded-xl">
              <div className="w-screen flex flex-col items-center">
                <h1 className="text-xl font-medium mb-8">
                  Confirm Ride
                </h1>
              </div>
    
              <div className="flex items-center gap-2 mb-4 mt-2 ">
              <div className='text-2xl mx-4'><FaLocationDot /></div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 ">
                  <h1 className="text-2xl font-semibold "> 562/11-A</h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    Kaikondrahalli, Bengaluru, Karnataka
                  </h1>
                </div>
                </div>
              </div>
    
                <hr className='bg-gray-400'/>
    
              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className='text-1xl mx-5'><FaSquareFull /></div>
                <div className='flex flex-col gap-1'>
                <div className="flex items-center gap-2 ">
                  <h1 className="text-2xl font-semibold">Third Wave Coffee</h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    17th Cross Rd, PWD Quarers, 1st Sector, HSR Layout, Bengaluru,
                    Karnataka
                  </h1>
                </div>
                </div>
              </div>
    
              <hr className='bg-gray-400'/>
    
              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className='text-2xl mx-4'><FaCreditCard /></div>
                <div className='flex flex-col gap-1'>
                <div className="flex items-center gap-2 ">
                  <h1 className="text-2xl font-semibold">193.20</h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    Cash Cash
                  </h1>
                </div>
                </div>
              </div>

              <div className='mt-6 flex justify-center'><button 
              onClick = {()=>{setLookingPanel(true);
                setConfirmPanel(false)
              }}
              className='px-4 py-2 rounded-lg bg-black text-white w-[90%]'>Confirm</button></div>
    
            </div>
          </div>
    
        </div>
      )
}

export default ConfirmPanel