import React, { useEffect, useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';

const Inputdata = ({InputDiv,setInputDiv,Updatedata,setUpdatedata}) => {
  const [Data,setData] = useState({title:"",desc:"",});
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    setData({title:Updatedata.title,desc:Updatedata.desc});
  }, [Updatedata]);
  const change =(e)=>{
    const{name, value}= e.target;
    setData({...Data,[name]:value});
  };
  
  const submitdata= async()=>{
    if(Data.title==="" || Data.desc===""){
      alert("All fields are required");
    }else{
      await axios.post("http://localhost:4000/api/v2/create-task",Data,{headers});
      setData({title:"",desc:"",});
      setInputDiv("hidden");
    }
  };
  const Updatetask= async()=>{
    if(Data.title==="" || Data.desc===""){
      alert("All fields are required");
    }else{
      await axios.put(`http://localhost:4000/api/v2/update-task/${Updatedata.id}`,Data,{headers});
      setData({title:"",desc:"",});
      setUpdatedata({id:"",
        title:"",
        desc:"",
        });
        setData({title:"",desc:"",});
      setInputDiv("hidden");
    }
  };
  return (
    <>
    <div className={`${InputDiv} top-0 left-0 bg-gray-700 opacity-80 h-screen w-full`}></div>
    <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
   
        <div className='w-2/6 bg-gray-900 p-4 rounder '>
        <div className="flex justify-end text-xl">
          <button onClick={()=>{setInputDiv("hidden"); setData({title:"",desc:"",
            }) ;setUpdatedata({id:"",
            title:"",
            desc:"",
            });
          }}
           >
            <FaWindowClose /></button></div>
            <input 
            type="text"
            placeholder="Title" 
            name="title" 
            className="p-2 rounded w-full  bg-gray-500 my-3"
            value={Data.title}
            onChange={change}
            />
            <textarea 
            name="desc" 
            cols="30" 
            rows="10"
            type="text"
            placeholder="Enter the description.." 
            className="p-2 rounded w-full  bg-gray-500 my-3"
            value={Data.desc}
            onChange={change}
            ></textarea>
            {Updatedata.id==="" ?<button className='p-1 bg-blue-400 text-black  font-semibold rounded'onClick={submitdata}>Submit</button>:
            <button className='p-1 bg-blue-400 text-black  font-semibold rounded'onClick={Updatetask}>Update</button>}
            
            
        
        </div>
    </div>
    </>
  )
}

export default Inputdata