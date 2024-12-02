import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-cover bg-[url('https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="pt-10 flex justify-end">
            <img className= "w-[7rem] mr-9 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        </div>
      <div className="py-7 px-8 bg-white">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link to='/home'  className=" text-xl w-full bg-black text-white py-4 rounded-md mt-4 flex justify-center items-center"><span className="mr-2">Continue</span> <FaArrowRight /></Link>
      </div>
    </div>
  );
};

export default Home;
