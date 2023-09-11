import React, { useEffect, useState } from 'react';
import '../../styles/SuccessAlert.css';
import Icons from '../icons/MuiIcons';
import { TaskListInterface } from '../../services/interfaces/TaskListInterface';
import { getIcon } from '../../services/constants/Constants';

const TaskListAlert: React.FC<TaskListInterface> = ({taskType}) => {
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
      <span>{getIcon(taskType) }</span> 
      <p></p>
    </div>
    </div>
 
  );
}

export default TaskListAlert;

//Illustration by <a href="https://icons8.com/illustrations/author/SeNkWCgQNZ1P">NinaWave</a> from <a href="https://icons8.com/illustrations">Ouch!</a>