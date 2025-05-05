import { Box, Button, Grid, Stack } from '@mui/material';
import { submitBtnStyle } from 'app';
import { useTranslation } from 'react-i18next';
import GridRow from 'shared/components/grid-container/grid-row';
import DrivingLicenseVerification from './verifications/driving-licence-verification';
import useDrivingLicenseVerification from '../hooks/useDrivingLicenseVerification';

const FourthForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  handleBack,
  setCurrentPageNo,
  setActiveStep,
  userInfo,
  setUserInfo,
}) => {
  const { t } = useTranslation();

  // Use the custom hook for all DL logic/state
  const dlVerification = useDrivingLicenseVerification({
     setUserInfo,
     userInfo,
  });

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
            stepsList={stepsList}
            userInfo={userInfo}
            {...dlVerification}
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
                  {t('Previous')}
                </Button>
                <Button
                  onClick={() => {
                    // if (!isAadhaarVarified) {
                    //   showErrorMessage(aaddharNumberverify);
                    //   return;
                    // }
                    setCurrentPageNo(5);
                    setActiveStep(4);
                  }}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                  // disabled={
                  //   !(
                  //     (isAadhaarVarified && (!dlVerification.isDLAvailable || dlVerification.isDLVarified)) ||
                  //     !dlVerification.isDLAvailable ||
                  //     dlVerification.isDLVarified
                  //   )
                  // }
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
