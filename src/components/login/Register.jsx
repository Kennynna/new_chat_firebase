import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { styled } from '@mui/material';
import { ButtonUi } from '../../shared/Button';

import {
  TextField,
  Card,
  CardContent,
  Container,
  Box
} from '@mui/material';


const Block = styled(Container)({
  backgroundColor: 'transparent',
  color: '#f9f9f9',
  maxWidth: '100%',
  '& .MuiInputLabel-root': {
    color: '#f9f9f9'
  },
  // Стиль лейбла при фокусе
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#f9f9f9'
  },
  // Пример изменения цвета рамки у поля
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#f9f9f9'
    },
    '&:hover fieldset': {
      borderColor: '#f9f9f9'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f9f9f9'
    }
  }
});



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('res', res);
      console.log("Создаем документ в коллекции users");
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: []
      });
      console.log("Документ users создан");

      console.log("Создаем документ в коллекции userchats");
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });
      console.log("Документ userchats создан");
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
    <Block component="main" maxWidth="xs">
      <Box
        sx={{
          maxWidth: '100%',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{
          maxWidth: '100%', mt: 2, bgcolor: 'transparent', boxShadow: 'none', borderRadius: '5px',
          borderImageSource: 'linear-gradient(to right, red 0%, blue 100%)'
        }}>

          <CardContent>
            <Box component="form" onSubmit={registerUser} sx={{ mt: 1, maxWidth: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-username"
                label="Имя пользователя"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={
                  {
                    color: '#f9f9f9'
                  }
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={
                  {
                    color: '#f9f9f9'
                  }
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="register-password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={
                  {
                    color: '#f9f9f9'
                  }
                }
              />
            </Box>
          </CardContent>
        </Card>
        <ButtonUi text='Зарегистрироваться' onClick={registerUser} />
      </Box>
    </Block>
  );
};

export default Register;

