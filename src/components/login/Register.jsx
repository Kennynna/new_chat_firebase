import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Container,
  Box
} from '@mui/material';

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardHeader
            title={
              <Typography variant="h5" component="h1" align="center">
                Регистрация
              </Typography>
            }
          />
          <CardContent>
            <Box component="form" onSubmit={registerUser} sx={{ mt: 1 }}>
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Регистрация
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;

