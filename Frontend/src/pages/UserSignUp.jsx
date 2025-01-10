import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

    

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data ={
      fullname : {
        firstname,
        lastname
      },
      email, 
      password};

    try{
    const response = await axios.post(`${API_URL}/register`, data);

    if(response.status === 201){
      console.log("User created successfully", response.data.user);
      
      toast.success("User created successfully");

      navigate("/login");
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
          className="bg-gray-300 rounded-md w-[50%] p-2"
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          required
          className="bg-gray-300 p-2 rounded-md w-[50%]"
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
          required
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

export default UserSignUp