import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import { API_URL_RIDES } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setCreateRide } from '../features/userSlice';

const ConfirmPanel = ({setConfirmPanel, setDriverPanel, setLookingPanel, setVehiclePanel}) => {

    const pickup = useSelector((store) => store.userData.createRide.pickup);
    const destination = useSelector((store) => store.userData.createRide.destination);
    const fare = useSelector((store) => store.userData.createRide.fare);
    const vehicleType = useSelector((store) => store.userData.createRide.vehicleType);
    const dispatch = useDispatch();

    const pickupHeader = pickup?.split(",")[0];
    const destinationHeader = destination?.split(",")[0];

    const ConfirmHandler = async ()=>{
      setLookingPanel(true);
      setConfirmPanel(false);

      try{
        const res = await axios.post(`${API_URL_RIDES}/create`, {
          pickup,
          destination,
          vehicleType
        },{ headers : {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  
          'Content-Type': 'application/json', // Specify content type
      }})
      dispatch(setCreateRide({userId : res.data.user}))
      }
      catch(err)
      {
        console.log(err);
      }

    }

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
                  <h1 className="text-2xl font-semibold "> {destinationHeader}</h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    {destination}
                  </h1>
                </div>
                </div>
              </div>
    
                <hr className='bg-gray-400'/>
    
              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className='text-1xl mx-5'><FaSquareFull /></div>
                <div className='flex flex-col gap-1'>
                <div className="flex items-center gap-2 ">
                  <h1 className="text-2xl font-semibold">{pickupHeader}</h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    {pickup}
                  </h1>
                </div>
                </div>
              </div>
    
              <hr className='bg-gray-400'/>
    
              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className='text-2xl mx-4'><FaCreditCard /></div>
                <div className='flex flex-col gap-1'>
                <div className="flex items-center gap-2 ">
                  <h1 className="text-2xl font-semibold flex items-center">
                  <span><MdCurrencyRupee /></span>
                  <span>{fare[vehicleType]}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-800 text-sm">
                    Cash Cash
                  </h1>
                </div>
                </div>
              </div>

              <div className='mt-6 flex justify-center'><button 
              onClick = {ConfirmHandler}
              className='px-4 py-2 rounded-lg bg-black text-white w-[90%]'>Confirm</button></div>
    
            </div>
          </div>
    
        </div>
      )
}

export default ConfirmPanel