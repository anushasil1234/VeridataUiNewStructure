import {
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import GridRow from 'shared/components/grid-container/grid-row';
import AadhaarVerification from "./verifications/aadhar-verification";
import { submitBtnStyle } from "app";
import showErrorMessage from "shared/utils/associate/show-error-message";
import { aaddharNumberverify } from "shared/constants/constants";
import { useEffect } from 'react';

const ThirdForm = ({ t, formElement, stepsList, onAadhaarVerified, userInfo,setUserInfo, handleBack,handleNext, setCurrentPageNo, setActiveStep }) => {
  const { isAadhaarVarified } = userInfo;
  
  useEffect(() => {
    onAadhaarVerified(isAadhaarVarified)
  }, [isAadhaarVarified]);
  return (<Box sx={{ width: '100%' }}>
    <form ref={formElement}>
      <Grid
        sx={{ paddingLeft: '20px' }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <AadhaarVerification stepsList={stepsList} isAadhaarVarified={isAadhaarVarified} onVerified={onAadhaarVerified} userInfo={userInfo} />
        <GridRow>
          <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
            <Stack flexDirection={'row'}>
              <Button
                onClick={handleBack}
                sx={submitBtnStyle}
                variant='contained'
                color='primary'
              >
                { }
                {t('Previous')}
              </Button>
              <Button
                onClick={() => {
                  handleNext()
                   if (!isAadhaarVarified) {
                     showErrorMessage(aaddharNumberverify);
                    return;
                   }
                }}
                sx={submitBtnStyle}
                variant='contained'
                color='primary'
              // disabled={!isAadhaarVarified}

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

export default ThirdForm; 