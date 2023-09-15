import React, { useEffect, useState } from 'react';
import successImg from '../../assets/SuccessImage.svg';
import '../../styles/SuccessAlert.css';

const SuccessAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verzögern Sie das Erscheinen des Alerts um einige Millisekunden, um die Animation besser sichtbar zu machen
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

export default SuccessAlert;

//Illustration by <a href="https://icons8.com/illustrations/author/SeNkWCgQNZ1P">NinaWave</a> from <a href="https://icons8.com/illustrations">Ouch!</a>