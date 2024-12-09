import React, {useEffect} from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { useSelector,  useDispatch } from 'react-redux';
import { MdCurrencyRupee } from "react-icons/md";
import axios from 'axios';
import { API_URL_RIDES } from '../utils/constants';
import { setCreateRide } from '../features/userSlice';

const LookingPanel = ({setLookingPanel, setVehiclePanel, setDriverPanel}) => {

  const pickup = useSelector((store) => store.userData.createRide.pickup);
    const destination = useSelector((store) => store.userData.createRide.destination);
    const fare = useSelector((store) => store.userData.createRide.fare);
    const vehicleType = useSelector((store) => store.userData.createRide.vehicleType);
    const userId = useSelector((store) => store.userData.createRide.userId);
    const pickupHeader = pickup?.split(",")[0];
    const destinationHeader = destination?.split(",")[0];
    const {status} = useSelector((store)=> store.userData.createRide)
    const dispatch = useDispatch();



    useEffect(()=>{
      const getStatus = async () =>{
        try{
          const res = await axios.post(`${API_URL_RIDES}/get-status`,{
            id: userId
          })
          dispatch(setCreateRide({status : res.data}))
      }
      catch(err)
      {
        console.log(err);
      }
      }
      getStatus();
    })
  return (
    <div>
         <div className=" relative m-0 p-0 w-full mx-auto">
        <div onClick = {()=> {setLookingPanel(false)
            setVehiclePanel(true)
        }} className="down bg-slate-500 w-14 h-1 absolute -top-6 left-40 "></div>

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
            <div className="flex items-center font-semibold text-xl">
                  <span><MdCurrencyRupee /></span>
                  <span>{fare[vehicleType]}</span>
            </div>
            <div>
              <h1 className="text-gray-800 text-sm">
                Cash Cash
              </h1>
            </div>
            </div>
          </div>

        </div>

        <div className='bg-red-300 w-[95%] mx-auto'><button className='w-full p-2 rounded-md bg-black text-white'>Cancel</button></div>


      </div>

    </div>
  )
}

export default LookingPanel