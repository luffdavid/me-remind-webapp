import React, { useState } from 'react';
import {Alert, AlertTitle, Snackbar, Button,  TextField, Backdrop, CircularProgress } from '@mui/material';
import { login } from '../services/requests/AuthRequests';
import { useTranslation } from 'react-i18next';
import {MDBContainer,MDBCol,MDBRow }from 'mdb-react-ui-kit';
import LoginImage from '../assets/LoginImage.svg'
function Login() {

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
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6' style={{textAlign:'center'}}>
        <img src={LoginImage} width={"330px"} alt="Phone image" />
        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" /> */}
        </MDBCol>
        <br />
        <MDBCol col='4' md='6'>
        <h1 style={{color:'white', textAlign:'center'}}>LOGIN</h1>
              <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
              <TextField
            variant="filled"
            sx={{backgroundColor:'white', color:'black', borderRadius:'10px'}}
            margin="normal"
            required
            fullWidth
            label={t("email", {ns: ['auth']})}
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            sx={{backgroundColor:'white', color:'black', borderRadius:'10px'}}
            margin="normal"
            required
            fullWidth
            label={t("password", {ns: ['auth']})}
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between mx-4 mb-4">
            <a href="/signup" style={{color:'white', opacity:'0.7', textDecoration:'none'}}>  {t("signupLink", {ns: ['auth']})} </a>
          </div>

          <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             style={{ margin: '24px 0 16px', padding:'10px', borderRadius:'10px' }}
           >
             {t("login", {ns: ['auth']})} 

           </Button>
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
         {t("alertMsgLogin", {ns: ['auth']})} {email}
       </Alert>
     </Snackbar>
    )}

   {isErrorOpen && (
     <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
       <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
         <AlertTitle>{t("errorLogin", {ns: ['auth']})}</AlertTitle>
         {errorMsg}
       </Alert>
     </Snackbar>
   )
   }
</>
   );
 }

export default Login;
