import React, { useState } from 'react';
import {Alert, AlertTitle, Snackbar, Button, Container, CssBaseline, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import { signup } from '../services/requests/AuthRequests';
import { useTranslation } from 'react-i18next';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import SignupImage from '../assets/SignupImage.svg'
import CustomizedButton from '../components/buttons/ButtonTemplates';
import TextFieldStyleBlack from '../styles/TextFieldStyle';
import TextFieldStyle from '../styles/TextFieldStyle';
import TfStyleSecondary  from '../styles/LoginStyle';

import { PRIMARY } from '../services/constants/Constants';
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
    e.preventDefault(); 

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
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6' style={{textAlign:'center'}}>
       {/* <img src="
      https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Phone image" /> */}
      <img src={SignupImage} width={"330px"} alt='Signup Image' />
        </MDBCol>
        <br />
        <MDBCol col='4' md='6'>
        <h1 style={{color:'white', textAlign:'center'}}>{t("signup", {ns: ['auth']})} </h1>
              <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
         <TextField
            sx={TfStyleSecondary}
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
            sx={TfStyleSecondary}
            margin="normal"
            required
            fullWidth
            label={t("lastName", {ns: ['auth']})}
            type="string"
             value={lastName}
            onChange={ (e) => setLastName(e.target.value)}
            />
          <TextField
            sx={TfStyleSecondary}
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
             sx={TfStyleSecondary}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t("password", {ns: ['auth']})}
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between mx-4 mb-4" >
          <a
  href="/login"
  style={{
    color: 'white',
    opacity: '0.7',
    textDecoration: 'none',
  }}
>
  {t("loginLink", { ns: ['auth'] })}
</a>
          </div>
          <div style={{display:'flex', justifyContent:'right' }}>
          <CustomizedButton
          type='submit'
          variant='contained'
          text={t("signup", {ns: ['auth']})}
          
          />
          </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

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