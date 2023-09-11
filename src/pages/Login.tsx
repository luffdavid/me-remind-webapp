import React, { useState } from 'react';
import {Alert, AlertTitle, Snackbar, Button, Container, CssBaseline, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import { login } from '../services/requests/AuthRequests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response =  await login( email, password);
      if(response === "Error") {
        setIsLoading(false);
        //ERROR (username/password incorrect OR error )
        setErrorMsg("");
        setIsErrorOpen(true);
			    setTimeout(() => {
				  setIsErrorOpen(false);
			}, 60000);
    } else {
      //SUCCESS
      setIsLoading(false);
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
      setIsSuccessOpen(true);
      setTimeout(() => {
      setIsSuccessOpen(false);
    }, 60000);
    window.location.reload();
    }

    } catch (error) {
      setIsLoading(false);
      const response =  await login( email, password);
      console.log(response);
      setErrorMsg("");
			setIsErrorOpen(true);
			setTimeout(() => {
				setIsErrorOpen(false);
			}, 60000); 
    }
  };

  return (
    <>
    {isLoading && (
         <div style={{textAlign:'center'}}>
         <div 
             className="loading"
             style={{display: 'flex',
             justifyContent: 'center',
             alignItems: 'center'
             }}>
         <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open={isLoading}
             >
               <p>
                 <CircularProgress sx={{color:'white'}} /> 
               </p>
         </Backdrop>
        </div>
       </div>
    )}
    <Container component="main" maxWidth="xs" sx={{border:'1px solid black', padding:'10px'}}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
        <Typography variant="h5">Anmelden</Typography>
        <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="E-Mail-Adresse"
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Passwort"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0 16px' }}
          >
            Anmelden
          </Button>
        </form>
      </div>
    </Container>

    {isSuccessOpen && (
  <Snackbar open={isSuccessOpen} autoHideDuration={null} onClose={() => setIsSuccessOpen(false)}>
        <Alert 
        onClose={() => setIsSuccessOpen(false)} 
      severity="success" >
          <AlertTitle>Success</AlertTitle>
         Logged in as {email}
        </Alert>
      </Snackbar>
    )}

    {isErrorOpen && (
      <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
        <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
          <AlertTitle>Error: Logging in wasn't successful</AlertTitle>
          {errorMsg}
        </Alert>
      </Snackbar>
    )}
</>

  );
}

export default Login;
