import React,{useEffect} from 'react';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import InTasks from './pages/InTasks';
import CompTasks from './pages/CompTasks';
import ImpTasks from './pages/ImpTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Routes, Route,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

const App = () => {
  const navigate= useNavigate();
  const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn === false){
       navigate("/signup");
    }
  }, []);

  
  return (
  <div className="bg-gray-900 text-white h-screen p-2 relative">
    
      <Routes>
        <Route exact path="/" element= {<Home/>} >
          <Route index element={<AllTasks/>}/>
          <Route path="/importantTasks" element= {<ImpTasks/>} />
          <Route path="/completedTasks" element= {<CompTasks/>} />
          <Route path="/incompletedTasks" element= {<InTasks/>} />
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
          
  </div>
  )
}

export default App