import {
  Box,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from './form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import { Autorenew } from '@mui/icons-material';
import TextInput from 'shared/components/input-fields/text-input';
import { useSelector, useDispatch } from 'react-redux';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import VerificationStatus from '../../../shared/components/verification/verification-status';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';

const InsuranceDetails = ({
  stepsList,
  isPANAvailable,
  pan,
  nameAsOnPan,
}) => {
  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode } = loggedInData[0];
  const dispatch = useDispatch();
  const [insurancestatusMessage, setInsuranceStatusMessage] = useState(new VerificationStatus());

  // const setCurrentPageNo = (currentPageNo) => {
  //   dispatch(storeCurrentPageNo(currentPageNo));
  // };

  return (
    <>
      {isPANAvailable && (
        <>
          <FormHeadingContainer>
            <FormHeading step={stepsList?.ID?.step} heading={stepsList?.ID?.name} />
          </FormHeadingContainer>
          <GridRow>
            <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
              <TextInput label="PAN Number" value={pan} disabled={true} />
              <Button
                sx={{ ...submitBtnStyle, margin: '5px 0' }}
                variant="contained"
                endIcon={<Autorenew />}
              >
                Check
              </Button>
              <VerificationStatusSection docType={insurancestatusMessage} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: '0px !important', md: '20px!important' },
              }}
            >
              <TextInput label="Name on PAN" value={nameAsOnPan} disabled={true} />
            </Grid>
          </GridRow>
        </>
      )}
    </>
  );
};

export default InsuranceDetails;
