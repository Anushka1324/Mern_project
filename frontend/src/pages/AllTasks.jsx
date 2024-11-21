import React, { useState,useEffect } from 'react'
import Cards from '../components/Home/Cards'
import Inputdata from '../components/Home/Inputdata';
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden")
  const [Data, setData] = useState();
  const [Updatedata, setUpdatedata] = useState({id:"",
    title:"",
    desc:"",
  });
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch=async()=>{
    const response=await axios.get("http://localhost:4000/api/v2/get-all-tasks",{headers});
    
    setData(response.data.data);
    };
    if(localStorage.getItem("id")&& localStorage.getItem("token")){
      fetch();
    }
    
});

  return (
    
    <>
    <div>
      <div className='w-full flex justify-end px-4 py-2'>
        <button onClick={()=>setInputDiv("fixed")}><IoMdAddCircle className='text-3xl  hover:text-green-500 transition-all duration-300'/></button></div>
      {Data && <Cards home={"true"}  setInputDiv={setInputDiv} data={Data.tasks} setUpdatedata={setUpdatedata}/>}</div>
      <Inputdata InputDiv={InputDiv} setInputDiv={setInputDiv} Updatedata={Updatedata} setUpdatedata={setUpdatedata}/>
    </>
  )
}

export default AllTasks