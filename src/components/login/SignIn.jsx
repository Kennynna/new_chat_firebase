import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import toast from 'react-hot-toast';
import AuthForm from './AuthForm';

const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Вход выполнен успешно');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при входе');
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <AuthForm title="Вход" onSubmit={loginUser}>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Пароль:</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button mt-10">
        Войти
      </button>
    </AuthForm>
  );
};

export default Login;

