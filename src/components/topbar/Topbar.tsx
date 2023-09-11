import React, {useState }from 'react';
import Avatar from '@mui/material/Avatar';
import Icons from '../icons/MuiIcons';
// import logo from '../../assets/MeRemindLogo.jpeg'; 
import { useTranslation } from "react-i18next";
import './Topbar.css'
import { Select, MenuItem, Button, Menu } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import { getUserInformation, logout } from '../../services/constants/Constants';
import { getUserStatus } from '../../services/constants/Constants';

const Topbar = () => {
 const isLoggedIn = getUserStatus();
  const languages = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'German', flag: 'DE' },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation(['home']);

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
    localStorage.setItem('language', language); // de , en
}
const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
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
          <div>
            <Avatar
                onClick={handleMenu}
              >
                {getUserInformation("firstName")[0]}
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> Select language:
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
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Button startIcon={<Icons.LogoutIcon />} variant='outlined' color='error' onClick={logout}>Logout</Button>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        
  
      <hr style={{opacity:'0.4'}}/>
  </div>   
    )}
    </>
  );
}

export default Topbar;
