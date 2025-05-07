import { Box, Button, Grid, Stack } from '@mui/material';
import { submitBtnStyle } from 'app';
import GridRow from 'shared/components/grid-container/grid-row';
import FIRVerification from './verifications/fir-verifications';
import useFIRVerification from '../hooks/useFIRVerification';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const SeventhForm = ({
  formElement,
  stepsList,
  handleBack,
  setCurrentPageNo,
  setActiveStep,
  userInfo,
  setUserInfo,
}) => {
  const { t } = useTranslation();
  // Use the custom hook for all FIR logic/state
  const firVerification = useFIRVerification({
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
          <FIRVerification
            stepsList={stepsList}
            userInfo={userInfo}
            {...firVerification}
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
