import React, { useState, useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { MdToggleOff } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { TbBrandSpeedtest } from "react-icons/tb";
import { PiNotepadLight } from "react-icons/pi";
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'; 
import NewRidesPanel from "../components/NewRidesPanel";
import axios from "axios"
import { API_URL_RIDES } from "../utils/constants";
const CaptainHomePage = () => {
  gsap.registerPlugin(useGSAP);
  const [toggle, setToggle] = useState(false);
  const [captainDetailsPopup, setCaptainDetailsPopup] = useState(true);
  const captainPopupRef = useRef(null);
  const [newRidePanelPopup, setNewRidePanelPopup] = useState(false);
  const newRidePanelPRef = useRef(null);


  useEffect(()=>{
    if(toggle)
      {
        setNewRidePanelPopup(true)
      }
      else
      {
        setNewRidePanelPopup(false)
      }
  }, [toggle])

 

  const handler = function ()
  {
    setCaptainDetailsPopup((val) => !val)
  }

  useGSAP(()=>{

    if(!captainDetailsPopup)
    {
    gsap.to(captainPopupRef.current, {
        y: "82%",
        duration: 0.7
    })
    }
    else
    {
      gsap.to(captainPopupRef.current, {
        y: "0%",
        duration: 0.7
    })
    }
  },[captainDetailsPopup])


  useGSAP(()=>{

    console.log(newRidePanelPopup);

    if(!newRidePanelPopup)
    {
    if(toggle)
    {
    gsap.to(newRidePanelPRef.current, {
        y: "92%",
        duration: 0.7
    })
  }
  else
  {
    gsap.to(newRidePanelPRef.current, {
      y: "100%",
      duration: 0.7
  })
  }
    }
    else
    {
      gsap.to(newRidePanelPRef.current, {
        y: "0%",
        duration: 0.7
    })
    }
  },[ newRidePanelPopup, toggle])

  return (
    <div className="relative h-screen w-screen">
      <div className="fixed top-0 w-screen">
        <div className="bg-white w-full  flex justify-evenly items-center py-3">
          <div className="text-2xl">
            <TiThMenu />
          </div>

          <h1 className="text-xl px-20">{toggle ? "Online" : "Offline"}</h1>

          <div
            onClick={() => {setToggle((prevVal) => !prevVal)
            }}
            className={`${toggle ? "text-green-300" : "text-black"} text-4xl  `}
          >
            {toggle ? <MdToggleOn /> : <MdToggleOff />}
          </div>
        </div>

        {!toggle && (
          <div className="bg-orange-500 flex gap-4 p-2">
            <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center">
              {" "}
              <IoMoon />{" "}
            </div>
            <div className="flex flex-col items-start">
              <div className="text-xl font-semibold">You are offline !</div>
              <div>Go Online to start accepting the jobs</div>
            </div>
          </div>
        )}
      </div>

      <div ref={captainPopupRef} className="bg-white w-screen absolute bottom-0 pt-14 rounded-t-2xl">

        <div className="flex justify-between mx-4 relative">

          <div onClick={handler} className="w-10 h-1 bg-gray-500 absolute -top-9 left-[9.5em]"></div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D')]"></div>
            <div className="flex flex-col">
              <div className="text-xl font-semibold">Jeremiah Curtis</div>
              <div className="text-xs text-gray-500">Basic level</div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <div className="font-semibold">325.00 Rs</div>
            <div className="text-xs text-gray-500">Earned</div>
          </div>
        </div>

        <div className="flex justify-evenly bg-yellow-400 my-6 py-4 w-[90%] mx-auto p-2 rounded-xl">
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl text-gray-500"><MdOutlineWatchLater /></div>
            <div>10.2</div>
            <div className="text-xs text-gray-500">HOURS ONLINE</div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl text-gray-500"><TbBrandSpeedtest /></div>
            <div>30KM</div>
            <div className="text-xs text-gray-500">TOTAL DISTANCE</div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl text-gray-500"><PiNotepadLight /></div>
            <div>20</div>
            <div className="text-xs text-gray-500">TOTAL JOBS</div>
          </div>
        </div>

      </div>

      <div className="map h-screen w-screen bg-cover bg-[url('https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG')]"></div>

      <div ref={newRidePanelPRef} className="absolute bottom-0 bg-white">
        <NewRidesPanel setNewRidePanelPopup={setNewRidePanelPopup} newRidePanelPopup={newRidePanelPopup} toggle={toggle}/>
      </div>


    </div>
  );
};

export default CaptainHomePage;
