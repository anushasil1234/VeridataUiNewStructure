

import React, { useEffect, useState } from "react";
import {
  CardLayout,
} from "shared/utils";

import AppointeeRegisterForm from "./appointee-register-form";
import { useSelector } from "react-redux";
import NotAccessibleSection from "shared/components/not-accessible/not-accessible";
// import CandidateRegisterFirstPage from "./candidate-register-first-page";


const AppointeeRegister = () => {
  const loggedInData = useSelector((state) => state.loggedInData);
  const { status, isPrerequisiteDataAvailable, consentStatus } = loggedInData[0];
  // console.log("logindata", loggedInData[0]);
  const [isRegistrationPermitted, setIsRegistrationPermitted] = useState();

  useEffect(() => {
    if ((status === 'Ongoing' || status === 'No Response') && isPrerequisiteDataAvailable && consentStatus === 1) {
      setIsRegistrationPermitted(true);
    }
    else {
      setIsRegistrationPermitted(false);
    }
  }, [status])
  return (
    <CardLayout>
      {
        isRegistrationPermitted === true ?
          <AppointeeRegisterForm /> :
          <NotAccessibleSection />
      }
    </CardLayout>
  );
};

export default AppointeeRegister;




