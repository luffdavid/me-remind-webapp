import { differenceInDays } from "date-fns";
import Icons from "../../components/icons/MuiIcons";


const PRIMARY ='#08edb3';
// set API link
let api_base = '';

if (process.env.NODE_ENV === 'production') {
  api_base = 'https://me-remind-api.onrender.com';
} else {
  api_base = 'http://localhost:3001';
}

const DATE_TODAY = new Date().setHours(0, 0, 0, 0);

const languages = [
  { code: 'en', name: 'English', flag: 'GB' },
  { code: 'de', name: 'German', flag: 'DE' },
];

// isLoggedIn ?
function getUserStatus () {
  if(localStorage.getItem('user')) {
    return true;    
  } else {
    return false;
  }
}

//USER logout
function logout() {
  localStorage.removeItem('user');
  window.location.reload();
 }

 // get email, firstName, lastName and id of user
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

// get the right Icon for the TaskListAlert
function getIcon (taskType : string) {
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


function getDifference(dueDate: number | Date, todayDate: number | Date) {
  // const { t } = useTranslation(['tasklist']);
  const diff = differenceInDays(dueDate, todayDate);
  let text = '';
  return diff;
//  if (diff === -1) {
//     text = t("yesterdayDue", {ns: ['tasklist']});
//   } else if (diff === 0) {
//     text = t("todayDue", {ns: ['tasklist']});
//   } else if(diff > 1) {
//     text =  t("dueIn", {ns: ['tasklist']}) + diff + " " + t("days", {ns: ['tasklist']})
//   } else if(diff < -1) {
//     text =  t("dueOver", {ns: ['tasklist']}) + Math.abs(diff) + " " + t("days", {ns: ['tasklist']})
//   }

//   return <i>{text}</i>;
}

export default getDifference;


export { PRIMARY,DATE_TODAY, api_base,languages, getUserStatus, logout, getUserInformation, getIcon, getDifference};
