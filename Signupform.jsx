import React, { useState } from 'react'
import './Loginform.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signupform = () => {
    const history = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials=true;
  const handleSubmit= async(e)=>{
    e.preventDefault();
     try{ await axios.post("http://localhost:8080/signup",{
        name,email,password
      }).then((res)=>{
        if(res.data==="exist"){
          alert("User already exists");
        }
        else if(res.data==="notexist"){
          history("/general");
          // alert("User has not signed in");
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
                <h1>Sign Up</h1>

                <div className="input-box">
                    <input type="text" placeholder='Set Username' onChange={(e)=>{setName(e.target.value)}} required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="email" placeholder='email address' onChange={(e)=>{setEmail(e.target.value)}}  required />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Set Password' onChange={(e)=>{setPassword(e.target.value)}}  required autoComplete="on"/>
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="confirm-password" placeholder='Confirm Password' required autoComplete="on"/>
                    <FaLock className="icon" />
                </div>

                <button type="submit" onClick={handleSubmit}>SignUp</button>

                <div className="register-link">
                    <p>
                        Already have an account?  <Link to="/">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signupform;
