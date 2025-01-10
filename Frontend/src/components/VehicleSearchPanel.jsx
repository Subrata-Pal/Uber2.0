import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setVehicleType } from '../features/userSlice';
import { MdCurrencyRupee } from "react-icons/md";
import { setCreateRide } from '../features/userSlice';

const VehicleSearchPanel = ({setVehiclePanel, setConfirmPanel }) => {
  const dispatch = useDispatch();
  const fare = useSelector((store) => store.userData.createRide.fare);

  const handleVehicleClick = (vehicleType) => {
    // Dispatch the vehicle type to the store
    dispatch(setCreateRide({vehicleType}));
    setVehiclePanel(false);
    setConfirmPanel(true);
  };

  return (
    <div className="w-full">
      <div className="relative m-0 p-0 w-full mx-auto">
      <div onClick = {()=> {setVehiclePanel(false);
    
            }} className=" bg-slate-500 w-14 h-1 absolute -top-6 left-40 "></div>
        <div
          onClick={() => handleVehicleClick("car")}
          className="w-screen flex justify-between items-center mt-10 border-2 active:border-black p-2 rounded-xl"
        >
          <div className="w-24">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium">UberGo</h1>
              <h1 className="flex items-center">
                <img
                  className="w-8"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW84cDGU6M1Pg7zndkpKMWAZ6fb6Lqdwt3Zg&s"
                  alt=""
                />
                4
              </h1>
            </div>
            <div>
              <h1 className="text-gray-500 text-sm">Affordable, compact rides</h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span><MdCurrencyRupee /></span>
            <span>{fare.car}</span>
          </div>
        </div>

        <div
          onClick={() => handleVehicleClick("moto")}
          className="w-screen flex justify-between mt-3 border-2 active:border-black p-2 rounded-xl"
        >
          <div className="w-20 pl-2 ml-2 mr-6">
            <img
              src="https://img.freepik.com/premium-vector/bike-vector-illustration-bike-logo-design-motorcycle-vector-illustration-motorcycle-logo-design_921448-816.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium">Moto</h1>
              <h1 className="flex items-center">
                <img
                  className="w-8"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW84cDGU6M1Pg7zndkpKMWAZ6fb6Lqdwt3Zg&s"
                  alt=""
                />{" "}
                1
              </h1>
            </div>
            <div>
              <h1 className="text-gray-500 text-sm">Affordable motorcycle rides</h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span><MdCurrencyRupee /></span>
            <span>{fare.moto}</span>
          </div>
        </div>

        <div
          onClick={() => handleVehicleClick("auto")}
          className="w-screen flex justify-between mt-3 border-2 active:border-black p-2 rounded-xl"
        >
          <div className="w-16 pl-2 ml-2 mr-6">
            <img
              src="https://png.pngtree.com/png-vector/20230527/ourmid/pngtree-vector-image-of-tuktuk-perfect-for-mobile-apps-web-apps-and-print-media-vector-png-image_52259266.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium">Auto</h1>
              <h1 className="flex items-center">
                <img
                  className="w-8"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW84cDGU6M1Pg7zndkpKMWAZ6fb6Lqdwt3Zg&s"
                  alt=""
                />{" "}
                3
              </h1>
            </div>
            <div>
              <h1 className="text-gray-500 text-sm">Compact and Affordable</h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span><MdCurrencyRupee /></span>
            <span>{fare.auto}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearchPanel;
