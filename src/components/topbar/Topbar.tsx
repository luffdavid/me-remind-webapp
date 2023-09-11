import React from 'react';
import Avatar from '@mui/material/Avatar';
import Icons from '../icons/MuiIcons';
// import logo from '../../assets/MeRemindLogo.jpeg'; 
import { useTranslation } from "react-i18next";
import './Topbar.css'
import { Select, MenuItem, Button } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import { getUserInformation, logout } from '../../services/constants/Constants';
import { getUserStatus } from '../../services/constants/Constants';

const Topbar = () => {
 const isLoggedIn = getUserStatus();
  const languages = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'German', flag: 'DE' },
  ];

  const { t, i18n } = useTranslation(['home']);

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
    localStorage.setItem('language', language); // de , en
}
  return (
    <>
    {!isLoggedIn && (
      <>
      <div style={{marginLeft:'90%'}}>
       <div className="avatar">
          <div className='languageSettings'>
          <Select
          className="custom-select"
          value={i18n.language}
          style={{ borderStyle:'none' }}
          onChange={onClickLanguageChange}
        >
          {languages.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              <ReactCountryFlag countryCode={language.flag} svg />
            </MenuItem>
          ))}
        </Select>
          </div>
        </div>
        </div>
      </>
    )}

    {isLoggedIn && (
      <div>
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
          value={i18n.language}
          style={{ borderStyle:'none' }}
          onChange={onClickLanguageChange}
        >
          {languages.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              <ReactCountryFlag countryCode={language.flag} svg />
            </MenuItem>
          ))}
        </Select>
          </div>
          <Button onClick={logout}>Logout</Button>
          
          <Avatar  alt="Username">{getUserInformation("firstName")[0]} </Avatar> 
          </div>
        </div>
        
  
      <hr style={{opacity:'0.4'}}/>
  </div>   
    )}
    </>
  );
}

export default Topbar;
