import React from 'react';
import './login.css';
import SignIn from './SignIn';
import Register from './Register';

function Login() {
  return (
    <div className="login-container bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] text-black flex gap-10 items-stretch rounded-xl">
      <Register />
      <SignIn />
    </div>
  );
}

export default Login;
