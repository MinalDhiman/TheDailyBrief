import React, { useState } from 'react'
import './Loginform.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loginform = () => {
    const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // axios.defaults.withCredentials=true;
  const handleSubmit= async(e)=>{
    e.preventDefault();
     try{ await axios.post("http://localhost:8080/login",{
        email,password
      },{
        withCredentials:true,
        headers:{
          'Content-Type':"application/json"
        }
      }
      ).then((res)=>{
        if(res.data==="exist"){
          history("/general");
        }
        else if(res.data==="notexist"){
          alert("User has not signed in");
        }
      }).catch(e=>{
        alert("wrong details");
        console.log(e);
      })
    }
    catch(e){
        console.log("error has occured");
    }
  }
  return (
    <div className='loginform'>
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>

                <div className="input-box">
                    <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required autoComplete="on"/>
                    <FaLock className="icon" />
                </div>

                <button type="submit" onClick={handleSubmit}>Login</button>

                <div className="register-link">
                    <p>
                        Don't have an account?  <Link to="/signup">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Loginform;
