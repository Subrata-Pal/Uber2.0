import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
import { MdCall } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";

const DriverPanel = ({setDriverPanel}) => {
  return (
    <div>
      <div className=" relative m-0 p-0 w-full mx-auto">
        <div
          onClick={() => {
            setDriverPanel(false);
          }}
          className=" bg-slate-500 w-14 h-1 absolute -top-6 left-40 "
        ></div>

        <div className="w-screen flex flex-col pl-0 mt-8 rounded-xl">
          <div className="w-screen flex justify-around items-center mb-4">
            <h1 className="text-xl font-medium">Meet at the pickup point</h1>
            <div className="w-16 h-16 text-white text-xl flex flex-col items-center bg-black">
              <span>2</span>
              <span>min</span>
            </div>
          </div>
          <hr className="bg-gray-400 w-screen" />

          <div className="flex items-center gap-2 mb-4 mt-2 ">
            <div className="w-60">
              <img
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
                alt=""
              />
            </div>

            <div className="flex flex-col items-end  mx-4 py-2 tracking-tight leading-[0.3rem] gap-2 w-full ">
              <h1>SANTH</h1>
              <h1 className="text-2xl font-semibold ">KA15AK00-0</h1>
              <h1 className="text-gray-800 text-sm">
                White Suzuki S-Presso LXI
              </h1>
              <h1>
                <span>4.9</span>
              </h1>
            </div>
          </div>

          <hr className="bg-gray-400" />

          <div className="flex justify-evenly my-4  w-full">
            <div className="flex flex-col gap-1 items-center">
              <div className="bg-gray-300 w-16 h-16 text-4xl text-blue-500 flex items-center justify-center rounded-full">
                <AiFillSafetyCertificate />
              </div>
              <h1 className="font-semibold text-xl">Safety</h1>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <div className="bg-gray-300 w-16 h-16 text-4xl text-blue-500 flex items-center justify-center rounded-full">
                <TiLocationOutline />
              </div>
              <h1 className="font-semibold text-xl">Share my trip</h1>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <div className=" bg-gray-300 w-16 h-16 text-4xl text-blue-500 flex items-center justify-center rounded-full">
                <MdCall />
              </div>
              <h1 className="font-semibold text-xl">Call driver</h1>
            </div>
          </div>

          <hr className="bg-gray-400" />

          <div className="flex items-center gap-2 mb-4 my-4">
            <div className="text-2xl  mx-5">
              <MdLocationPin />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 ">
                <h1 className="text-2xl font-semibold">562/11-A</h1>
              </div>
              <div>
                <h1 className="text-gray-800 text-sm">
                  Kaikondrahalli, Bengaluru, karnataka
                </h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DriverPanel;
