import React from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';
const Cards = ({home, setInputDiv,data,setUpdatedata}) => {
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
      };
    const handlecomp= async (id)=>{
        try {
            await axios.put(`http://localhost:4000/api/v2/update-complete-task/${id}`,{},{headers});
           
        } catch (error) {
            console.log(error);
        }
    };
    const handleimp= async (id)=>{
        try {
            await axios.put(`http://localhost:4000/api/v2/update-imp-task/${id}`,{},{headers});
           
        } catch (error) {
            console.log(error);
        }
    };
    const deletetask= async (id)=>{
        try {
            await axios.delete(`http://localhost:4000/api/v2/delete-task/${id}`,{headers});
           
        } catch (error) {
            console.log(error);
        }
    };
    const handleupdate =  (id,title,desc)=>{
        setInputDiv("fixed");
        setUpdatedata({id:id,title:title,desc:desc});
    };

return(
<div className='grid grid-cols-3 gap-4 p-4'>
    {data && data.map((items,i)=>
    <div className=' flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
    <div >
        <h3 className='text-xl font-semibold'>{items.title}</h3>
        <p className='text-gray-300 my-2'>{items.desc}</p>
        
    </div>
    <div className="mt-4 w-full flex items-center">
        <button className={`${items.complete===false ?"bg-red-400":"bg-green-500"}  p-1 rounded w-3/6`}
        onClick={()=>handlecomp(items._id)}>
            {items.complete===true ?"Completed":"Incomplete"}</button>
    <div className='text-white p-1 w-3/6 text-xl flex font-semibold justify-around'>
        <button onClick={()=>handleimp(items._id)}>
            {items.important===false ? (<CiHeart />):(<FaHeart className='text-red-400'/>)}</button>
            {home !=="false" && <button onClick ={()=>handleupdate(items._id,items.title,items.desc)}><FaEdit /></button>   }    
        <button onClick={()=>deletetask(items._id)}><MdDelete /></button>
    </div>
        </div></div>
    )}
    {home==="true" && (
    <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300 'onClick={()=>setInputDiv("fixed")}>
    <IoMdAddCircle className='text-5xl' /><h2 className='text-2xl mt-4'>Add task</h2>
    </button>)}
</div>)
}
  


export default Cards