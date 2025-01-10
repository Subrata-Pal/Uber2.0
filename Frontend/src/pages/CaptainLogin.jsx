import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL_CAPTAINS } from '../utils/constants'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }

    try{
      const response = await axios.post(`${API_URL_CAPTAINS}/login`, data);
  
      if(response.status === 200){
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/captain-home");
        toast.success("User logged in successfully");
      }
    }
    catch(error){ 
      console.log(error);

      if(error.response?.data?.errors){
        toast.error(error.response?.data?.errors[0]?.msg);
      }
      else{
        toast.error(error.response?.data?.msg);
      }
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-[90%] mx-auto h-screen">
      <div className="mt-4 my-4">
        <img className="w-[3rem]" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
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
            className="p-2 bg-gray-300 rounded-md w-full"
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
          className="bg-gray-300 p-2 rounded-md"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md mt-4"
        >
          Login
        </button>

        <h1 className="text-center mt-2">or</h1>
       </form>
       <Link to="/login" className="bg-yellow-500 w-full text-black inline-block flex justify-center text-white py-2 rounded-md mt-2">Sign in as user</Link>

      
      <div className="mt-2">
        <h1>Join a fleet? <Link className="underline text-[1.1em] text-black" to="/captain-signup">Register as a captain</Link></h1>
      </div>

      <section className="mt-4 h-[27%] flex flex-col justify-between">
        <div className="text-[0.8em] text-gray-600">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </div>
        <div className="text-[0.8em] text-gray-600">
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
      </section>
    </div>
  );
}

export default CaptainLogin

