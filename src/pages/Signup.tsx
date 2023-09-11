import React, { useState } from 'react';
import {Alert, AlertTitle, Snackbar, Button, Container, CssBaseline, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import { signup } from '../services/requests/AuthRequests';
import { useTranslation } from 'react-i18next';


function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { t } = useTranslation(['auth']);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Verhindert, dass das Formular standardmäßig gesendet wird

    if (password.length < 6) {
      setErrorMsg("Password lenght must be > 5 ")
      setIsErrorOpen(true);
			setTimeout(() => {
				setIsErrorOpen(false);
			}, 60000); 
      return; 
    }
    try {
      setIsLoading(true);
      const response =  await signup(firstName, lastName, email, password);
      if(response === "Error") {
        setIsLoading(false);
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
    const response =  await signup( firstName, lastName, email, password);
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
        <Typography variant="h5">{t("signup", {ns: ['auth']})}</Typography>
        <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("firstName", {ns: ['auth']})}
            type="string"
            value={firstName}
            onChange={ (e) => setFirstName(e.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("lastName", {ns: ['auth']})}
            type="string"
             value={lastName}
            onChange={ (e) => setLastName(e.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("email", {ns: ['auth']})}
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("password", {ns: ['auth']})}
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
            {t("signup", {ns: ['auth']})}
          </Button>
        </form>
      </div>
    </Container>

    {isSuccessOpen && (
  <Snackbar open={isSuccessOpen} autoHideDuration={null} onClose={() => setIsSuccessOpen(false)}>
        <Alert 
        onClose={() => setIsSuccessOpen(false)} 
      severity="success" >
          <AlertTitle>{t("success", {ns: ['auth']})}</AlertTitle>
          {t("alertMsgRegister", {ns: ['auth']})}
        </Alert>
      </Snackbar>
    )}

    {isErrorOpen && (
      <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
        <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
          <AlertTitle>{t("errorRegister", {ns: ['auth']})}</AlertTitle>
          {errorMsg}
        </Alert>
      </Snackbar>
    )}
</>
  );
}

export default Signup;
