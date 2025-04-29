import { Box, Button, Grid, Stack } from '@mui/material';
import { submitBtnStyle } from 'app';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GridRow from 'shared/components/grid-container/grid-row';
import {
    previousButton
} from 'shared/constants/constants';
import FIRVerification from './fir-verifications';
const SeventhForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  handleBack,
  currentPageNo,
  setCurrentPageNo,
  activeStep,
  setActiveStep,
  firstPageForm,
  isPANAvailable,
  setIsPANAvailable,
  firstatusMessage,
  isPoliceVarified,
  setisPoliceVarified,
  setFIRStatusMessage,
  firDetails,
  setFIRDetails,
  pan,
  setPan,
  nameAsOnPan,
  dateOfBirth,
  setDateOfBirth,
}) => {
  const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
  const { t } = useTranslation(); 
  console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0];
  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode, candidateId, userName } = loggedInData[0];
  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <FIRVerification
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            firstPageForm={firstPageForm}
            firstatusMessage={firstatusMessage}
            setFIRStatusMessage={setFIRStatusMessage}
            isPoliceVarified={isPoliceVarified}
            setisPoliceVarified={setisPoliceVarified}
            firDetails={firDetails}
            setFIRDetails={setFIRDetails}
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
                  {t(previousButton)}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentPageNo(8); 
                    setActiveStep(7); 
                  }}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
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
export default SeventhForm;
