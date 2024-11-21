import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
const Signup = () => {
  const navigate= useNavigate();
  const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
  if(isLoggedIn === true){
    navigate("/");
  }
  const [Data, setData] = useState({username:"",email:"",password:"",});
  const change = (e)=> {
    const { name, value }= e.target;
    setData({...Data,[name]:value});
  };
  
  const submit = async()=>{
   
    try {
      if(Data.username === "" || Data.email === "" || Data.password === ""){
        alert("All fields are required");
      }
      else{
        const response= await axios.post("http://localhost:4000/api/v1/sign-in",Data);
        setData({username:"",email:"",password:"",});
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
      
  };
  return (
    <div className=" h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        <input 
          type="text" 
          placeholder="username"
          className="bg-gray-700  w-full px-3 py-2 my-3 rounded"
          name="username"
          value={Data.username} 
          onChange={change}
          />
        <input 
          type="text" 
          placeholder="xyz@example.com"
          className="bg-gray-700  w-full px-3 py-2 my-3 rounded"
          value={Data.email} 
          name="email" 
          required 
          onChange={change}
        />
        <input 
          type="password" 
          placeholder="password"
          className="bg-gray-700  w-full px-3 py-2 my-3 rounded"
          value={Data.password} 
          name="password" 
          onChange={change}
        />
        <div className="w-full flex items-center justify-between">
            <button className="bg-blue-500 text-x1 rounded font-semibold px-3 py-2" onClick={submit}>Signup</button>
            <Link to="/login" className="text-gray-400 hover:text-green-600">Already having an account? Login here</Link>
        </div>
        </div>
    </div>
  );
};

export default Signup;