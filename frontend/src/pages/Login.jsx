import React ,{useState}from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useSelector,useDispatch } from 'react-redux';
const Login = () => {
  const navigate= useNavigate();
  const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
  if(isLoggedIn === true){
    navigate("/");
  }
  const [Data, setData] = useState({username:"",password:"",});
  const dispatch=useDispatch();
  const change = (e)=> {
    const { name, value }= e.target;
    setData({...Data,[name]:value});
  };
 
  const submit = async()=>{
   
    try {
      if(Data.username === "" || Data.password === ""){
        alert("All fields are required");
      }
      else{
        const response= await axios.post("http://localhost:4000/api/v1/log-in",Data);
        setData({username:"",password:"",});
        //console.log(response);
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
      
  };
  return (
    <div className=" h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Login</div>
        <input type="text" placeholder='username'name="username" className='bg-gray-700  w-full px-3 py-2 my-3 rounded 'value={Data.username} 
          onChange={change} />
        <input type="password" placeholder='password'name="password" className='bg-gray-700  w-full px-3 py-2 my-3 rounded'value={Data.password} 
          onChange={change} />
        <div className="w-full flex items-center justify-between">
            <button className="bg-blue-500 text-x1 rounded font-semibold px-3 py-2" onClick={submit}>Login</button>
            <Link to="/signup" className="text-gray-400 hover:text-green-600">Not having an account? Signup here</Link>
        </div>
        
        </div>
    </div>
  )
}

export default Login