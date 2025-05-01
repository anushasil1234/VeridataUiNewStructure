import { Box, Button, Grid, Stack } from '@mui/material';
import { submitBtnStyle } from 'app';
import { useSelector } from 'react-redux';
import GridRow from 'shared/components/grid-container/grid-row';
import { previousButton } from 'shared/constants/constants';
import PANVerification from './verifications/pan-verification';

const FifthForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  handleBack,
  setCurrentPageNo,
  setActiveStep,
  isPANAvailable,
  setIsPANAvailable,
  nameAsOnPan,
  panstatusMessage,
  setPANStatusMessage,
  setIsPanVarified,
  isPanVarified,
  disabledPanInput,
  pan,
  setPan,
}) => {
  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <PANVerification
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            isPANAvailable={isPANAvailable}
            setIsPANAvailable={setIsPANAvailable}
            nameAsOnPan={nameAsOnPan}
            panstatusMessage={panstatusMessage}
            setPANStatusMessage={setPANStatusMessage}
            setIsPanVarified={setIsPanVarified}
            isPanVarified={isPanVarified}
            disabledPanInput={disabledPanInput}
            pan={pan}
            setPan={setPan}
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
                  {previousButton}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentPageNo(6);
                    setActiveStep(5);
                  }}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                >
                  {'Next'}
                </Button>
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
      </form>
    </Box>
  );
};

export default FifthForm;
