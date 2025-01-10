import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareFull } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import axios from 'axios'
import { API_URL_RIDES } from "../utils/constants";
import {useDispatch, useSelector} from "react-redux"
import { setRideDetails, resetRideDetails } from "../features/captainSlice";

const NewRidesPanel = ({setNewRidePanelPopup,  newRidePanelPopup, toggle}) => {

  const dispatch = useDispatch();

  const {pickup, vehicleType, destination, fare, firstname, lastname, user, status} = useSelector((store)=> store.captainData.rideDetails)


  useEffect(()=>{
    
    const rideInformation = async () =>{

      try{
        const rideDetails = await axios.get(`${API_URL_RIDES}/get-rides-information`);

        if (!rideDetails?.data?.information?.[0]) {
          console.error("No ride information available.");
          dispatch(resetRideDetails());
          return; // Exit or handle the missing data case
        }


        const {user, pickup, status, vehicleType, destination, fare} = rideDetails?.data?.information[0];

        const userInformation = await axios.get(`${API_URL_RIDES}/get-user-information`,{
          params : {
            id : user
          }
        });

        const {firstname, lastname} = userInformation?.data;

        dispatch(setRideDetails({
          pickup,
          destination,
          vehicleType,
          fare,
          firstname,
          lastname,
          user
      }))
        
      }
      catch(err)
      {
        console.log(err)
      }    

    }
    rideInformation();
  }, [toggle, newRidePanelPopup])


  const confirmHandler = async ()=>{
    try{
        const setStatus = await axios.post(`${API_URL_RIDES}/set-status`,{
          status : "accepted",
          id: user
        })

        if(setStatus.data.acknowledged)
        {
          dispatch(setRideDetails({status : "accepted"}))
        }
    }
    catch(err)
    {
      console.log(err);
    }
  }


  return (
    <div>
      <div className=" relative m-0 p-0 w-full mx-auto">
        <div
          onClick={() => {setNewRidePanelPopup((prev) => !prev)}}
          className=" bg-slate-500 w-14 h-1 absolute -top-6 left-40 "
        ></div>

      {
        !firstname ? (<div className="w-screen  flex flex-col pl-0 mt-8 p-2 rounded-xl">
          <div className="w-screen flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-4">No Rides Available!</h1>
          </div>
          </div>) :
        (<div className="w-screen  flex flex-col pl-0 mt-8 p-2 rounded-xl">
          <div className="w-screen flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-4">New Ride Details!</h1>
          </div>

        <div className="flex items-center  justify-between  bg-yellow-400 p-2 w-[95%] mx-auto rounded-lg mb-2">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D')]"></div>
            <div className="text-xl font-semibold">{`${firstname} ${lastname}`}</div>
          </div>
          <div className="font-semibold ">2.2 KM</div>
        </div>


          <div className="flex items-center gap-2 mb-4 mt-2 ">
            <div className="text-2xl mx-4">
              <FaLocationDot />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 ">
                <h1 className="text-xl font-semibold "> {destination?.split(",")[0]}</h1>
              </div>
              <div>
                <h1 className="text-gray-800 text-xs">
                  {destination}
                </h1>
              </div>
            </div>
          </div>

          <hr className="bg-gray-400" />

          <div className="flex items-center gap-2 mb-4 mt-2">
            <div className="text-1xl mx-5">
              <FaSquareFull />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 ">
                <h1 className="text-xl font-semibold">{pickup?.split(",")[0]}</h1>
              </div>
              <div>
                <h1 className="text-gray-800 text-xs">
                  {pickup}
                </h1>
              </div>
            </div>
          </div>

          <hr className="bg-gray-400" />

          <div className="flex items-center gap-2 mb-4 mt-2">
            <div className="text-2xl mx-4">
              <FaCreditCard />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 ">
                <h1 className="text-xl font-semibold">{fare[vehicleType]}</h1>
              </div>
              <div>
                <h1 className="text-gray-800 text-xs">Cash Cash</h1>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={confirmHandler}
              className="px-4 py-2 rounded-lg bg-green-600 text-white w-[90%]"
            >
              Confirm
            </button>
          </div>

          <div className="my-4 flex justify-center">
            <button
              onClick={() => {props.setNewRidePanelPopup(false)}}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white w-[90%]"
            >
              Ignore
            </button>
          </div>
        </div>)
      }
      </div>
    </div>
  );
};

export default NewRidesPanel;
