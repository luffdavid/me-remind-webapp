import { IconPropsSizeOverrides } from "@mui/material";
import Icons from "../../components/icons/MuiIcons";

let api_base = '';

if (process.env.NODE_ENV === 'production') {
  api_base = 'https://me-remind-api.onrender.com';
} else {
  api_base = 'http://localhost:3001';
}

const DATE_TODAY = new Date().setHours(0, 0, 0, 0);


function getUserStatus () {
  if(localStorage.getItem('user')) {
    return true;    
  } else {
    return false;
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.reload();
 }

 function getUserInformation(param: string) {
  const userStr = localStorage.getItem("user");

  if (param === "email" && userStr !== null) {
    return JSON.parse(userStr).email;
  } else if(param === "firstName" && userStr !== null) {
    return JSON.parse(userStr).firstName;
  } else if(param === "lastName" && userStr !== null) {
    return JSON.parse(userStr).lastName;
  } else if(param === "userId" && userStr !== null){
    return JSON.parse(userStr).userId;
  }
}

function getIcon (taskType : string) {
  let icon;
  if (taskType === 'COMPLETE') {
   return  <Icons.CheckCircleIcon style={{fontSize:'64px'}} /> ;
  } else if( taskType === 'INCOMPLETE') {
    return  <Icons.UnpublishedIcon style={{fontSize:'64px'}} />
  } else if (taskType === 'OVERDUE') {
    return  <Icons.WatchLaterIcon style={{fontSize:'64px'}} />
   } else {
    return  <Icons.TodayIcon style={{fontSize:'64px'}} />
    }
}


export { DATE_TODAY, api_base, getUserStatus, logout, getUserInformation, getIcon };
