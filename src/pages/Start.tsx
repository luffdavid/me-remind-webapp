import React from 'react'
import { StartCards } from '../components/cards/StartCards'
import { useTranslation } from 'react-i18next';

const Start = () => {

  const { t, i18n } = useTranslation(['start']);
  return (
    <div>
        <h1>{t("welcome", {ns: ['start']})} $username</h1>
		<StartCards />
	</div>
  )
}

export default Start