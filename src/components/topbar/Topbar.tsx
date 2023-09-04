import React from 'react';
import Avatar from '@mui/material/Avatar';
import Icons from '../icons/MuiIcons';
// import logo from '../../assets/MeRemindLogo.jpeg'; 
import { useTranslation } from "react-i18next";
import './Topbar.css'
import { Select, MenuItem } from '@mui/material';

const Topbar = () => {

  const { t, i18n } = useTranslation(['home']);

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
}
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
        <div className='languageSettings'>
        <Select
        className="custom-select"
        defaultValue={"English"}
        sx={{color:'white'}}
        style={{ width: 200 }}
        onChange={onClickLanguageChange}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="de">German</MenuItem>
      </Select>
        </div>
        <Avatar alt="Username"  src="/path-to-avatar-image.jpg" /> 
        </div>
      </div>
      

    <hr style={{opacity:'0.4'}}/>
    </>
   
  );
}

export default Topbar;
