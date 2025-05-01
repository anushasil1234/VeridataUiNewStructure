import { Box, Button, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import { previousButton } from 'shared/constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import BankVerification from './bank-verifications';

const SixthForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  handleBack,
  currentPageNo,
  setCurrentPageNo,
  activeStep,
  setActiveStep,
  bankstatusMessage,
  setBankStatusMessage,
  setIsPanVarified,
  isPanVarified,
  isBankVarified,
  setIsBankVarified,
  accountNumber,
  setAccountNumber,
  IFSCCode,
  setIFSCCode,
}) => {
  const loggedInData = useSelector((state) => state.loggedInData);

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
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            bankstatusMessage={bankstatusMessage}
            setBankStatusMessage={setBankStatusMessage}
            isBankVarified={isBankVarified}
            setIsBankVarified={setIsBankVarified}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            IFSCCode={IFSCCode}
            setIFSCCode={setIFSCCode}
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
                    setCurrentPageNo(7);
                    setActiveStep(6);
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

export default SixthForm;
