import React, { useState } from 'react';
import {Alert, AlertTitle, Snackbar, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { signup } from '../services/requests/AuthRequests';


function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Verhindert, dass das Formular standardmäßig gesendet wird

    if (password.length < 6) {
      setErrorMsg("Password lenght must be > 5 ")
      return; // Beende die Funktion, wenn das Passwort zu kurz ist
    }
    if(!firstName || !lastName || !email || !password) {
      setErrorMsg("Please fill in all fields!");
      return;
    }

    try {
      await signup(firstName, lastName, email, password);
      setIsSuccessOpen(true);
      setTimeout(() => {
      setIsSuccessOpen(false);
     }, 60000);
      // Hier kannst du den Benutzer nach der Registrierung zu einer anderen Seite weiterleiten
    } catch (error) {
     setErrorMsg('Error: ' + (error as Error).message);
			setIsErrorOpen(true);
			setTimeout(() => {
				setIsErrorOpen(false);
			}, 60000); 
    }
  };

  return (
    <>
    <Container component="main" maxWidth="xs" sx={{border:'1px solid black', padding:'10px'}}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
        <Typography variant="h5">Registrieren</Typography>
        <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Vorname"
            type="string"
            value={firstName}
            onChange={ (e) => setFirstName(e.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nachname"
            type="string"
             value={lastName}
            onChange={ (e) => setLastName(e.target.value)}
            />
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
            Registrieren
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
          User account created successfully
        </Alert>
      </Snackbar>
    )}

    {isErrorOpen && (
      <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
        <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
          <AlertTitle>Error: Creating new account wasn't successful</AlertTitle>
          {errorMsg}
        </Alert>
      </Snackbar>
    )}
</>
  );
}

export default Signup;
