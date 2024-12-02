import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";


const LookingPanel = ({setLookingPanel, setVehiclePanel}) => {
  return (
    <div>
         <div className=" relative m-0 p-0 w-full mx-auto">
        <div onClick = {()=> {setLookingPanel(false)
            setVehiclePanel(true)
        }} className=" bg-slate-500 w-14 h-1 absolute -top-6 left-40 "></div>

        <div className="w-screen flex flex-col pl-0 mt-8 border-2 p-2 rounded-xl">
          <div className="w-screen flex flex-col items-center">
            <h1 className="text-xl font-medium mb-8">
              Looking for neaby drivers
            </h1>
            <div className="w-36">
              <img
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
                alt=""
              />
            </div>
          </div>
          <hr className="bg-gray-600 w-screen" />

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

        </div>
      </div>

    </div>
  )
}

export default LookingPanel