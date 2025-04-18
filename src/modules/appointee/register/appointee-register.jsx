

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
  const appointeeStatusDetailsData = useSelector(state => state.appointeeStatusDetailsData);
  console.log("AppointeeStatusDetailsData", appointeeStatusDetailsData);
  // const { status, 
  //   //isPrerequisiteDataAvailable, 
  //   //consentStatus 
  //    } = loggedInData[0];
  const {isPrerequisiteDataAvailable,consentStatus,statusCode} = appointeeStatusDetailsData[0];
  const [isRegistrationPermitted, setIsRegistrationPermitted] = useState();

  useEffect(() => {
    if ((statusCode === 'ONGNG' || statusCode === 'NORES') && isPrerequisiteDataAvailable && consentStatus === 1) {
      setIsRegistrationPermitted(true);
    }
    else {
      setIsRegistrationPermitted(false);
    }
  }, [statusCode]);
  return (
    <CardLayout>
      {
        isRegistrationPermitted === true ?
          <AppointeeRegisterForm /> 
          :
          <NotAccessibleSection />
       }
    </CardLayout>
  );
};

export default AppointeeRegister;




