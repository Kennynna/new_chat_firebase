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
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonUi } from '../../shared/Button';
import { styled } from '@mui/material';


const Block = styled(Container)({
  backgroundColor: 'transparent',
  color: '#f9f9f9'
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async (event) => {
    setLoading(true);
    console.log(email, password);
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Вход выполнен успешно');
      toast.success('Вход выполнен успешно');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при входе');
    } finally {
      setEmail('');
      setPassword('');
      setLoading(false)
    }
  };

  return (
    <Block component="main" >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >
        <Card sx={{
          width: '100%', mt: 2, bgcolor: 'transparent', boxShadow: 'none', borderRadius: '5px',
          borderImageSource: 'linear-gradient(to right, red 0%, blue 100%)'
        }}>

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
            </Box>
          </CardContent>
        </Card>
        <ButtonUi disabled={loading} onClick={loginUser} text='Войти' />
      </Box>
    </Block>
  );
};

export default Login;

