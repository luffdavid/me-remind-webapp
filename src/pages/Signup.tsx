import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Hier können Sie die Logik für die Anmeldung implementieren
  };

  return (
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
            label="Vor- und Nachname"
            type="string"
            // value={Name}
            onChange={handleEmailChange}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="E-Mail-Adresse"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Passwort"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
  );
}

export default Signup;
