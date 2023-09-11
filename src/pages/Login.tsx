import React from 'react';
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
import { LoginImage }  from '../assets/LoginImage.jpg'

function Login() {
  return (
    <MDBContainer fluid className="p-3 my-5">
      <span style={{color:'black', textAlign:'center'}}>LOGIN</span>
      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src={LoginImage} className="img-fluid" alt="Phone image" />
        </MDBCol>
        <br />
        <MDBCol col='4' md='6'>


          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
          </MDBBtn>










          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="twitter" className="mx-2"/>
            Continue with twitter
          </MDBBtn>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
// import React, { useState } from 'react';
// import {Alert, AlertTitle, Snackbar, Button, Container, CssBaseline, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
// import { login } from '../services/requests/AuthRequests';
// import { useTranslation } from 'react-i18next';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [isErrorOpen, setIsErrorOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState([]);

//   const { t } = useTranslation(['auth']);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);
//       const response =  await login( email, password);
//       if(response === "Error") {
//         setIsLoading(false);
//         //ERROR (username/password incorrect OR error )
//         setErrorMsg("");
//         setIsErrorOpen(true);
// 			    setTimeout(() => {
// 				  setIsErrorOpen(false);
// 			}, 60000);
//     } else {
//       //SUCCESS
//       setIsLoading(false);
//         setUser(response);
//         localStorage.setItem('user', JSON.stringify(response));
//       setIsSuccessOpen(true);
//       setTimeout(() => {
//       setIsSuccessOpen(false);
//     }, 60000);
//     window.location.reload();
//     }

//     } catch (error) {
//       setIsLoading(false);
//       const response =  await login( email, password);
//       console.log(response);
//       setErrorMsg("");
// 			setIsErrorOpen(true);
// 			setTimeout(() => {
// 				setIsErrorOpen(false);
// 			}, 60000); 
//     }
//   };

//   return (
//     <>
//     {isLoading && (
//          <div style={{textAlign:'center'}}>
//          <div 
//              className="loading"
//              style={{display: 'flex',
//              justifyContent: 'center',
//              alignItems: 'center'
//              }}>
//          <Backdrop
//              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//              open={isLoading}
//              >
//                <p>
//                  <CircularProgress sx={{color:'white'}} /> 
//                </p>
//          </Backdrop>
//         </div>
//        </div>
//     )}
//     <Container component="main" maxWidth="xs" sx={{border:'1px solid black', padding:'10px'}}>
//       <CssBaseline />
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px' }}>
//         <Typography variant="h5">{t("login", {ns: ['auth']})}</Typography>
//         <form style={{ width: '100%', marginTop: '8px' }} onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             label={t("email", {ns: ['auth']})}
//             type="email"
//             value={email}
//             onChange={ (e) => setEmail(e.target.value)}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             label={t("password", {ns: ['auth']})}
//             type="password"
//             value={password}
//             onChange={ (e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             style={{ margin: '24px 0 16px' }}
//           >
//             {t("login", {ns: ['auth']})}
//           </Button>
//         </form>
//       </div>
//     </Container>

//     {isSuccessOpen && (
//   <Snackbar open={isSuccessOpen} autoHideDuration={null} onClose={() => setIsSuccessOpen(false)}>
//         <Alert 
//         onClose={() => setIsSuccessOpen(false)} 
//       severity="success" >
//           <AlertTitle>{t("success", {ns: ['auth']})}</AlertTitle>
//           {t("alertMsgLogin", {ns: ['auth']})} {email}
//         </Alert>
//       </Snackbar>
//     )}

//     {isErrorOpen && (
//       <Snackbar open={isErrorOpen} autoHideDuration={null} onClose={() => setIsErrorOpen(false)}>
//         <Alert onClose={() => setIsErrorOpen(false)} severity="error" >
//           <AlertTitle>{t("errorLogin", {ns: ['auth']})}</AlertTitle>
//           {errorMsg}
//         </Alert>
//       </Snackbar>
//     )}
// </>

//   );
// }

// export default Login;