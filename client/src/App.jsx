import './App.css'
import React from "react";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index'

import user_icon from './assets/icons8-username-24.png';
import email_icon from './assets/icons8-email-24.png';
import password_icon from './assets/password.png';
import { LOGIN, register } from './redux/authSlice';


const Web = () => {

  const dispatch = useDispatch();

  const [action, setAction] = useState("SIGN UP");
  const [values, setvalues] = useState({});

  const handleSubmit = (newAction) => {
    if (newAction === action) {
      if (newAction === "SIGN UP") {
        return dispatch(register(values))
      }
      dispatch(
        LOGIN({
          email: values.email,
          password: values.password,

        }))
    } else {
      setAction(newAction)
    }
  };

  return (

    <div className='Container'>

      <h1> Task Tracker</h1>

      <div className='wrapper2'>
        <div className='wrapper1'>
          <div className="text"> Welcome to Task Manager!</div>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          <div action='' >
            <div className="header">
              <div className=" text"> {action} </div>
              <div className=" underline"></div>
            </div>

            <div className="inputs">

              {action === "LOGIN" ? <div></div> : <div className="input">
                <img src={user_icon} alt='' />
                < input type="text" name='username' placeholder='Username' value={values.username}
                  onChange={(e) => setvalues({ ...values, username: e.target.value })} />
              </div>}

              <div className="input" >
                < img src={email_icon} alt='' />
                < input type="Email" name='email' placeholder='Email ID' value={values.email}
                  onChange={(e) => setvalues({ ...values, email: e.target.value })} />
              </div>
              <div className="input">
                <img src={password_icon} alt='' />
                <input type="Password" name='password' placeholder='Password' value={values.password}
                  onChange={(e) => setvalues({ ...values, password: e.target.value })} />
              </div>
            </div>

            <div className="remember">
              <input type="checkbox" name='Rcheckbox' />
              <p> Remember me</p>
            </div>


            {action === "SIGN UP" ? <div></div> :
              <div className='forgot-password'> Lost Password? <span> Click here!</span> </div>};

            <div className='btn-field'>
              <div type='button' className={action === "LOGIN" ? "submit gray" : "submit"} onClick={() => handleSubmit("SIGN UP")} > Sign up </div>
              <div type=' button' className={action === "SIGN UP" ? "submit gray" : "submit"} onClick={() => handleSubmit("LOGIN")} > Login </div>
            </div>
          </div>
        </form>
      </div>



    </div >

  )
}
export default Web
