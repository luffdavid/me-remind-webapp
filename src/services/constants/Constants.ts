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


export { DATE_TODAY, api_base, getUserStatus, logout };
