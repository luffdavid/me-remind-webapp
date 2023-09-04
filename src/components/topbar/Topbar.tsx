import React from 'react';
import Avatar from '@mui/material/Avatar';
import Icons from '../icons/MuiIcons';
// import logo from '../../assets/MeRemindLogo.jpeg'; 
import './Topbar.css'

const Topbar = () => {

  const handleRefreshClick = () => {
    window.location.reload();
  };
  return (
    <>
     <div className="topbar">
     <div>
        <Icons.RefreshIcon onClick={handleRefreshClick} />
      </div>
      <div className="logo">
        {/* <img src={logo} alt="Logo" /> */}
        {/* <h2 className='heading'>ME Remind</h2> */}
      </div>
      <div className="avatar">
        <Avatar alt="User Avatar" src="/path-to-avatar-image.jpg" /> 
      </div>
    </div>
    <hr style={{opacity:'0.4'}}/>
    </>
   
  );
}

export default Topbar;
