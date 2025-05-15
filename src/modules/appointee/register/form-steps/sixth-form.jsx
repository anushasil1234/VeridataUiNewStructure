import { Box, Button, Grid, Stack } from '@mui/material';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import BankVerification from './verifications/bank-verifications';
import useBankVerification from '../hooks/useBankVerification';
import { useTranslation } from 'react-i18next';

const SixthForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  handleBack,
  handleNext,
  // setCurrentPageNo,
  // setActiveStep,
  userInfo,
  setUserInfo,
}) => {
    const { t } = useTranslation(); 
  // Use the custom hook for all bank logic/state
  const bankVerification = useBankVerification({
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
          <BankVerification
            stepsList={stepsList}
            isAadhaarVarified={isAadhaarVarified}
            {...bankVerification}
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
                    handleNext();
                    // setCurrentPageNo(7);
                    // setActiveStep(6);
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

export default SixthForm;
