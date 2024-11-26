import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import AuthForm from './AuthForm';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: []
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });
      toast.success('Регистрация прошла успешно');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Пользователь с таким email уже существует');
      } else {
        toast.error('Ошибка при регистрации');
      }
    } finally {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <AuthForm title="Регистрация" onSubmit={registerUser}>
      <div className="form-group">
        <label htmlFor="register-username">Имя пользователя:</label>
        <input
          type="text"
          id="register-username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Пароль:</label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">
        Регистрация
      </button>
    </AuthForm>
  );
};

export default Register;

