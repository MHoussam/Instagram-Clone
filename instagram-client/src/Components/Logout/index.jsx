import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/feeds.css";

const Logout = () => {
    const [data] = useState({
        token: localStorage.getItem('token')
      })  

    const handleLogout = async ()=>{
        const response = await axios.post("http://localhost:8000/api/logout", data)
        console.log(response.data)
        navigate("/");
      }

      const navigate = useNavigate();

  return (
    <div>
        <button className="logout-btn pointer" onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}

export default Logout;