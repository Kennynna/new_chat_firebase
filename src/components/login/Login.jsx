import React from 'react';
import './login.css';
import SignIn from './SignIn';
import Register from './Register';
import { useState } from 'react';
function Login() {
  const [login, setLogin] = useState(true);

  const handleClickSign = () =>{
    setLogin(true)
  }
  const handleRegister = () =>{
    setLogin(false)
  }
  return (
    <div>
      <div className="login-container bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] rounded-xl">
        <div className='flex  border rounded-xl overflow-hidden cursor-pointer'>
          <p className={` p-3 flex-1 ${login ? 'text-login' : ''}`} onClick={handleClickSign}>
            Вход
          </p>
          <p className={` p-3 ${!login ? 'text-login' : ''}`} onClick={handleRegister}>
            Регистрация
          </p>
        </div>
        <div className=' text-black flex gap-10 items-stretch'>
          {!login && <Register />}
          {login && <SignIn />}
        </div>
      </div>
    </div>
  );
}

export default Login;
