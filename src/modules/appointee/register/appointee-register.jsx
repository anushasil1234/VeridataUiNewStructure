import React, { useEffect, useState } from 'react';
import { CardLayout } from 'shared/utils';
import AppointeeRegisterForm from './appointee-register-form';
import { useSelector } from 'react-redux';
import NotAccessibleSection from 'shared/components/not-accessible/not-accessible';

const AppointeeRegister = () => {
  const appointeeStatusDetailsData = useSelector((state) => state.appointeeStatusDetailsData);
  const { isPrerequisiteDataAvailable, consentStatus, statusCode } = appointeeStatusDetailsData[0];
  const [isRegistrationPermitted, setIsRegistrationPermitted] = useState(false);

  useEffect(() => {
    const isPermitted = (statusCode === 'ONGNG' || statusCode === 'NORES') &&
      isPrerequisiteDataAvailable &&
      consentStatus === 1;
    setIsRegistrationPermitted(isPermitted);
  }, [statusCode, isPrerequisiteDataAvailable, consentStatus]);

  return (
    <CardLayout>
      {isRegistrationPermitted ? <AppointeeRegisterForm /> : <NotAccessibleSection />}
    </CardLayout>
  );
};

export default AppointeeRegister;
