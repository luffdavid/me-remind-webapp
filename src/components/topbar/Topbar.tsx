import React from 'react';
import Avatar from '@mui/material/Avatar';
// import logo from '../../assets/MeRemindLogo.jpeg'; 
import './Topbar.css'
const Topbar = () => {
  return (
    <>
     <div className="topbar">
      <div className="logo">
        {/* <img src={logo} alt="Logo" /> */}
        {/* <h2 className='heading'>ME Remind</h2> */}
      </div>
      <div className="avatar">
        <Avatar alt="User Avatar" src="/path-to-avatar-image.jpg" /> {/* Passe den Avatar-Pfad an */}
      </div>
    </div>
    <hr style={{opacity:'0.4'}}/>
    </>
   
  );
}

export default Topbar;
