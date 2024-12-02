import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { API_URL_CAPTAINS } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [color, setColor] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data ={
      fullname : {
        firstname,
        lastname  
      },
      email, 
      password,
      vehicle : {
        color,
        plateNumber,
        capacity,
        vehicleType
    }};

    try{
    const response = await axios.post(`${API_URL_CAPTAINS}/register`, data);

    if(response.status === 201){
      console.log("User created successfully", response.data.user);
      
      toast.success("User created successfully");

      navigate("/captain-login");
    }
  }
  catch(error){
    console.log("Error in user creation", error);
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setColor("");
    setPlateNumber("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="w-[90%] mx-auto h-screen">
      <div className="mt-4 my-4">
        <img className="w-[3rem]" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">

      <h2 className="text-xl font-semibold mt-4 mb-2">What's your name?</h2>
      <div className="flex gap-2">
        <input
          required
          className="bg-gray-300 rounded-md w-[50%] p-2 placeholder:text-gray-600"
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          required
          className="bg-gray-300 p-2 rounded-md w-[50%] placeholder:text-gray-600"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

        <h2 className="text-xl font-semibold mt-4 mb-2">What's your email?</h2>
        <div className="flex items-center">
          <div className="mr-2 bg-gray-300 w-24 h-12 rounded-md flex items-center justify-center">
            <img
              className="w-[2rem]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_India.png/1280px-Flag_of_India.png"
              alt=""
            />
          </div>
          <input
            required
            className="p-2 bg-gray-300 rounded-md w-full placeholder:text-gray-600"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Enter your password</h2>
        <input
          required
          className="bg-gray-300 p-2 rounded-md placeholder:text-gray-600"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h2 className="text-xl font-semibold mt-4 mb-2">Vehicle Information</h2>
        <div className="flex gap-2">
          <input
            required
          className="bg-gray-300 rounded-md w-[50%] p-2 placeholder:text-gray-600"
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          required
          className="bg-gray-300 p-2 rounded-md w-[50%] placeholder:text-gray-600"
          type="text"
          name="plateNumber"
          id="plateNumber"
          placeholder="plate number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <input
          required
          className="bg-gray-300 rounded-md w-[50%] p-2 mt-4 placeholder:text-gray-600"
          type="number"
          name="capacity"
          id="capacity"
          min="1"
          max="6"
          placeholder="Seat Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <select
          required
          className="bg-gray-300 p-2 rounded-md w-[50%] mt-4"
          name="vehicleType"
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="" disabled>Select Vehicle</option>
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="bike">Bike</option>
        </select>
      </div>
        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md mt-16"
        >
          Create Account
        </button>
       </form>

      
      <div className="mt-4">
        <h1>Already have an account? <Link className="underline text-[1.1em] text-black" to="/login">Login here</Link></h1>
      </div>

      <div className="mt-4 h-[22%] flex flex-col justify-end">
      <div className="text-[0.8em] text-gray-600 ">
          This site is protected by reCAPTCHA and the Google{" "}
          <a className="text-black underline" href="">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="underline text-black" href="">
            Terms of Service
          </a>{" "}
          apply.
        </div>
      </div>
    </div>
  );  
}

export default CaptainSignUp;