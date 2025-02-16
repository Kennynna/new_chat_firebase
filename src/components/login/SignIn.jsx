import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase.js';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (event) => {
    console.log(email, password);
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Вход выполнен успешно');
      toast.success('Вход выполнен успешно');
    } catch (error) {
      console.error(error);
      setEmail('');
      setPassword('');
      toast.error('Ошибка при входе');
    } finally {
      toast.error('Ошибка при входе');

    }
  };

  return (
    <Container component="main" >
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
                Вход
              </Typography>
            }
          />
          <CardContent>
            <Box component="form" onSubmit={loginUser} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
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
                id="login-password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;

