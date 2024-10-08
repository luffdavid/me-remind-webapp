import React from 'react';
import { StartCards } from '../components/cards/StartCards';
import { useTranslation } from 'react-i18next';
import { PRIMARY, getUserInformation } from '../services/constants/Constants';

const Start: React.FC = () => {
  const { t } = useTranslation(['start']);

  return (
    <div>
      <h1>
        {t('welcome', { ns: ['start'] })}, 
        {localStorage.getItem('user') !== null && (
          <span style={{color:PRIMARY}}>{getUserInformation("firstName")}</span>)}{' '}
      </h1>
      <StartCards />
    </div>
  );
};

export default Start;
