import { Box, Button, Grid, Stack } from '@mui/material';
import { submitBtnStyle } from 'app';
import GridRow from 'shared/components/grid-container/grid-row';
import PANVerification from './verifications/pan-verification';
import usePanVerification from '../hooks/usePanVerification';

const FifthForm = ({
  formElement,
  stepsList,
  handleBack,
  setCurrentPageNo,
  setActiveStep,
  userInfo,
  setUserInfo,
}) => {
  // Use the custom hook for all PAN logic/state
  const panVerification = usePanVerification({
    userInfo,
    setUserInfo,
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
          <PANVerification
            stepsList={stepsList}
            
            {...panVerification}
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
                  {'Previous'}
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
