import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './login.css'; // Импортируем CSS файл
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc,  } from "firebase/firestore";
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const registerUser = async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    const formData = new FormData(event.target);
    const { username, password, email } = Object.fromEntries(formData.entries());

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); //регистрация
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked:[]
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats:[]
      });
      console.log(res);

      toast('Регистрация прошла успешно');

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast('Пользователь с таким email уже существует');
      }
    }
    finally {
      setUsername('')
      setPassword('')
      setEmail('')
    }
  }
  // Video in 01:31

  const loginUser = async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    finally {
      setUsername('')
      setPassword('')
      setEmail('')
    }

  };

  return (
    <div className="login-container  bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] text-black flex gap-10 items-stretch rounded-xl">
      <form className="login-form" onSubmit={registerUser} >
        <h2 className="login-title">Регистрация</h2>
        <div className="form-group ">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"  // Добавляем атрибут name
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"  // Добавляем атрибут name
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"  // Добавляем атрибут name
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Регистрация
        </button>

      </form>



      <form className="login-form" onSubmit={loginUser} >
        <h2 className="login-title">Вход</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"  // Добавляем атрибут name
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"  // Добавляем атрибут name
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button mt-10">
          Войти
        </button>
      </form>

    </div>
  );
}

export default Login;