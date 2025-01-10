import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const CaptainProtectedWrapper = ({children}) => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if(!token){
            navigate("/captain-login");
        }
    }, [token]);

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectedWrapper