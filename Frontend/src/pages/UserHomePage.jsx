import React, { useState } from "react";
import logo from "../assets/Uber_logo_black.png";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSearchPanel from "../components/VehicleSearchPanel";
import LookingPanel from "../components/LookingPanel";
import DriverPanel from "../components/DriverPanel";
import ConfirmPanel from "../components/ConfirmPanel";
import axios from "axios"
import { API_URL_MAPS, API_URL_RIDES } from "../utils/constants";
import  {useDispatch} from "react-redux"
import { setCreateRide } from "../features/userSlice";

const UserHomePage = () => {
  gsap.registerPlugin(useGSAP);
  const [toggle, setToggle] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const searchBoxRef = useRef();
  const arrowRef = useRef();
  const toggleRef = useRef();
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [lookingPanel, setLookingPanel] = useState(false);
  const lookingPanelRef = useRef(null);

  const [confirmPanel, setConfirmPanel] = useState(false);
  const confirmPanelRef = useRef(null);

  const [driverPanel, setDriverPanel] = useState(false);
  const driverPanelRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [ activeField, setActiveField ] = useState(null)

  const dispatch = useDispatch();

  

  const token = localStorage.getItem("token");

  const handleChange = async(e) => {
    e.preventDefault();
    setVehiclePanel(true);

    try{
      const res = await axios.get(`${API_URL_RIDES}/get-fare`, {params: {
        pickup,
        destination: dropoff,
      },
      headers : {
        Authorization: `bearer ${JSON.parse(token)}`,

        'Content-Type': 'application/json', // Specify content type
    } });

      const fare = res.data.fare;
      dispatch(setCreateRide({fare}))

      setToggle(false);
      setPickup("");
      setDropoff("");
  }
  catch(error)
  {
    console.log(error)
  }
  };

  useGSAP(() => {
    if (toggle) {
      gsap.to(searchBoxRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.from(arrowRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(searchBoxRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.from(toggleRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [toggle]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
        duration: 0.5,
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (lookingPanel) {
      gsap.to(lookingPanelRef.current, {
        y: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(lookingPanelRef.current, {
        y: "100%",
        duration: 0.5,
      });
    }
  }, [lookingPanel]);

  useGSAP(() => {
    if (confirmPanel) {
      gsap.to(confirmPanelRef.current, {
        y: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        y: "100%",
        duration: 0.5,
      });
    }
  }, [confirmPanel]);

  useGSAP(() => {
    if (driverPanel) {
      gsap.to(driverPanelRef.current, {
        y: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(driverPanelRef.current, {
        y: "100%",
        duration: 0.5,
      });
    }
  }, [driverPanel]);


  async function pickUpOnChangeHandler(e)
  {
    setPickup(e.target.value);

    try{

      if(e.target.value.length > 3)
      {
      const response = await axios.get(`${API_URL_MAPS}/get-suggestions`,{
        params:{
          input:e.target.value
        },
        headers: {
          Authorization: `bearer ${JSON.parse(token)}`,

          'Content-Type': 'application/json', // Specify content type
      },
      })
      setSuggestions(response.data);
      }
      else
      {
        setSuggestions([])
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async function dropOffChangeHandler(e)
  {
    setDropoff(e.target.value)

    try{

      if(e.target.value.length > 3)
      {
        
      const response = await axios.get(`${API_URL_MAPS}/get-suggestions`,{
        params:{
          input:e.target.value
        },
        headers: {
          Authorization: `bearer ${JSON.parse(token)}`,
           'Content-Type': 'application/json', // Specify content type
      },
      })
      setSuggestions(response.data);
      }
      else
      {
        setSuggestions([])
      }
    }
    catch(error)
    {
      console.log(error);
    }

  }
  

  return (
    <div className="relative h-screen w-screen">
      <div className="logo w-[5em] absolute top-8 left-9 overflow-x-hidden">
        <img src={logo} alt="logo" />
      </div>

      <div className="map h-screen w-screen bg-cover bg-[url('https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG')]"></div>

      <div className="search-box h-screen flex flex-col justify-end absolute top-0 w-screen">
        <div className="w-full bg-white">
          <div className="w-[93%] mx-auto pb-6 pt-4 flex flex-col gap-4 h-[30%] bg-white">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              {toggle ? (
                <span ref={arrowRef} onClick={() => setToggle(false)}>
                  {" "}
                  <IoIosArrowDown />{" "}
                </span>
              ) : (
                <span ref={toggleRef} onClick={() => setToggle(true)}>
                  Find a trip
                </span>
              )}
            </h1>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleChange}
            >
              <input
                className="w-full p-4 rounded-md bg-gray-300 placeholder:text-gray-600 placeholder:text-sm"
                onClick={() => {setToggle(true);
                  setActiveField('pickup')}
                }
                type="text"
                name="pickup"
                id="pickup"
                value={pickup}
                onChange={pickUpOnChangeHandler}
                placeholder="Add a Pickup Location"
                required
              />
              <input
                className="w-full p-4 rounded-md bg-gray-300 placeholder:text-gray-600 placeholder:text-sm"
                onClick={() =>{ setToggle(true);
                  setActiveField('destination')
                }}
                type="text"
                name="dropoff"
                id="dropoff"
                value={dropoff}
                onChange={dropOffChangeHandler}
                placeholder="Add a Dropoff Location"
                required
              />
              <button type="submit" className="bg-black p-2 rounded-lg text-white">Search</button>
            </form>
          </div>
        </div>
        <div
          ref={searchBoxRef}
          className="bottom-box bg-white h-0 overflow-hidden"
        >
          <div className="locationSearchPanel h-auto m-0 p-0">
            <LocationSearchPanel
              setToggle={setToggle}
              setVehiclePanel={setVehiclePanel}
              suggestions={suggestions}
              setPickup={setPickup}
              setSuggestions={setSuggestions}
              setDropoff={setDropoff}
              activeField={activeField}
            />
          </div>

          <div
            ref={vehiclePanelRef}
            className="z-10 translate-y-full fixed bottom-0 bg-white pt-2 pb-10 border-gray-400 rounded-t-2xl"
          >
            <VehicleSearchPanel
              setLookingPanel={setLookingPanel}
              setVehiclePanel={setVehiclePanel}
              setToggle={setToggle}
              setConfirmPanel={setConfirmPanel}
            />
          </div>

          <div
            ref={lookingPanelRef}
            className="z-10 translate-y-full fixed bottom-0 bg-white pt-2 pb-10 border-gray-400 rounded-t-2xl"
          >
            <LookingPanel
              setLookingPanel={setLookingPanel}
              setVehiclePanel={setVehiclePanel}
              setDriverPanel= {setDriverPanel}
              setConfirmPanel={setConfirmPanel}
            />
          </div>

          <div
            ref={driverPanelRef}
            className="z-10 translate-y-full  fixed bottom-0 bg-white pt-2 pb-10 border-gray-400 rounded-t-2xl"
          >
            <DriverPanel setDriverPanel= {setDriverPanel}/>
          </div>

          <div
            ref={confirmPanelRef}
            className="z-10 translate-y-full  fixed bottom-0 bg-white pt-2 pb-10 border-gray-400 rounded-t-2xl"
          >
            <ConfirmPanel setConfirmPanel={setConfirmPanel}  setDriverPanel= {setDriverPanel} setLookingPanel={setLookingPanel} setVehiclePanel={setVehiclePanel} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
