import {
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import GridRow from 'shared/components/grid-container/grid-row';
import AadhaarVerification from "./form-steps/verifications/aadhar-verification";
import { submitBtnStyle } from "app";
import showErrorMessage from "shared/utils/associate/show-error-message";
import { aaddharNumberverify } from "shared/constants/constants";

const ThirdForm = ({t, formElement,stepsList, isAadhaarVarified,onAadhaarVerified,userInfo,handleBack,setCurrentPageNo, setActiveStep}) => {
  return (  <Box sx={{ width: '100%' }}>
    <form ref={formElement}>
      <Grid
        sx={{ paddingLeft: '20px' }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <AadhaarVerification stepsList={stepsList} isAadhaarVarified={isAadhaarVarified} onVerified={onAadhaarVerified} userInfo={userInfo}  />
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
                    // if (!isAadhaarVarified) {
                    //   showErrorMessage(aaddharNumberverify);
                    //   return;
                    // }
                    setCurrentPageNo(4);
                    setActiveStep(3);
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