import React, { useEffect, useState } from 'react';
import successImg from '../../assets/SuccessImage.svg';
import '../../styles/SuccessAlert.css';

const ErrorAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
           <div className={`success-alert ${isVisible ? 'visible' : ''}`}>
      <img src={successImg} width={"330px"} alt="Success" />
      <p>Reminder saved!</p>
    </div>
    </div>
 
  );
}

export default ErrorAlert;
