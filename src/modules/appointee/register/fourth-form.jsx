
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    Stack
} from '@mui/material';
import {
    loginFieldIconStyle,
    submitBtnStyle
} from 'app';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GridRow from 'shared/components/grid-container/grid-row';
import {
    aaddharNumberverify
} from 'shared/constants/constants';
import { hasValue } from 'shared/utils';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import DrivingLicenseVerification from './driving-licence-verification';
const FourthForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  setAadharShareCode,
  handleBack,
  currentPageNo,
  setCurrentPageNo,
  activeStep,
  setActiveStep,
  firstPageForm,
  setFirstPageForm,
  isLicenseAvailable,
  setIsLicenseAvailable,
  isDLVarified,
  setisDLVarified,
  licensestatusMessage,
  setLicenseStatusMessage,
  isDLAvailable,
  setIsDLAvailable,
  drivingLicense,
  setDrivingLicense,
  dateOfBirth,
  setDateOfBirth,
}) => {
  console.log('currentPageNo', currentPageNo);
  console.log('activeStep', activeStep);
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState('password');
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />,
  );
  const handleShareCodeVisibility = () => {
    setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
  };
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  useEffect(() => {
    if (isPasswordVisibilityOn) {
      setPasswordType('text');
      setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
    } else {
      setPasswordType('password');
      setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
    }
  }, [isPasswordVisibilityOn]);
  useEffect(() => {
    if (hasValue(firstPageForm.isDLAvailable)) {
      setIsPreviousSectionDisabled(true);
    }
  }, [firstPageForm.isDLAvailable]);
  useEffect(() => {
    console.log('isDLVerificationDisabled changed:', isDLVerificationDisabled);
  }, [isDLVerificationDisabled]);
  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <DrivingLicenseVerification
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            firstPageForm={firstPageForm}
            setFirstPageForm={setFirstPageForm}
            isLicenseAvailable={isLicenseAvailable}
            setIsLicenseAvailable={setIsLicenseAvailable}
            isDLVarified={isDLVarified}
            setisDLVarified={setisDLVarified}
            licensestatusMessage={licensestatusMessage}
            setLicenseStatusMessage={setLicenseStatusMessage}
            isDLVerificationDisabled={isDLVerificationDisabled}
            isDLAvailable={isDLAvailable}
            setIsDLAvailable={setIsDLAvailable}
            drivingLicense={drivingLicense}
            setDrivingLicense={setDrivingLicense}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
          />
          <GridRow>
            <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
              <Stack flexDirection={'row'}>
                <Button
                  onClick={handleBack}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                >
                  {}
                  {t('Previous')}
                </Button>
                <Button
                  onClick={() => {
                    if (!isAadhaarVarified) {
                      showErrorMessage(aaddharNumberverify);
                      return; 
                    }
                    setCurrentPageNo(5); 
                    setActiveStep(4); 
                  }}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                  disabled={
                    !(
                      (isAadhaarVarified && (!isLicenseAvailable || isDLVarified)) ||
                      !isDLAvailable ||
                      isDLVarified
                    )
                  }
                >
                  {t('Next')}
                </Button>
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
      </form>
    </Box>
  );
};
export default FourthForm;

