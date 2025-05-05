import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  AppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import { modelToolbar } from 'app';
import { Close, Autorenew } from '@mui/icons-material';
import React from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import TextInput from 'shared/components/input-fields/text-input';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { DDMMYYYY } from 'shared/utils';

const FIRVerification = ({
  stepsList,
  isPoliceVarified,
  handleFIRChecking,
  isViewFIREnabled,
  setIsFIRModalOpen,
  isFIRModalOpen,
  firDetails,
  handleDialogCancel,
  firStatusMessage,
  userInfo,
}) => {
  const parsedFIRDetails =
    typeof firDetails === 'string' ? JSON.parse(firDetails) : firDetails || [];
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.FIRV?.step}
          heading={stepsList?.FIRV?.name}
          info={'Check if any FIR is filed against you.'}
        />
      </FormHeadingContainer>
      <GridRow>
        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
          <TextInput label={'Candidate Name'} value={userInfo?.appointeeName} disabled={true} />
          <Button
            sx={{ ...submitBtnStyle, margin: '5px 10px 5px 0' }}
            disabled={isPoliceVarified}
            variant='contained'
            onClick={handleFIRChecking}
            endIcon={<Autorenew />}
          >
            {'Check'}
          </Button>
          {isViewFIREnabled && (
            <Button
              sx={{ ...submitBtnStyle, margin: '5px 0' }}
              variant='contained'
              onClick={() => setIsFIRModalOpen(true)}
            >
              FIR Details
            </Button>
          )}
          {parsedFIRDetails.length > 0 && (
            <Dialog open={isFIRModalOpen} onClose={handleDialogCancel}>
              <AppBar sx={{ ...modelToolbar, position: 'sticky', top: '0' }}>
                <Toolbar>
                  <IconButton edge='start' onClick={handleDialogCancel} aria-label='close'>
                    <Close sx={{ color: '#fff' }} />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <DialogTitle>FIR Details</DialogTitle>
              <DialogContent>
                {parsedFIRDetails.length > 0 && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>FIR Number</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Police Station</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Crime Type</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {parsedFIRDetails.map((fir, index) => (
                        <TableRow key={index}>
                          <TableCell>{fir.FirNumber}</TableCell>
                          <TableCell>{fir.Date}</TableCell>
                          <TableCell>{fir.PoliceStation}</TableCell>
                          <TableCell>{fir.CrimeType}</TableCell>
                          <TableCell>{fir.Status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </DialogContent>
            </Dialog>
          )}
          <VerificationStatusSection docType={firStatusMessage} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingLeft: { xs: '0px !important', md: '20px!important' },
          }}
        >
          <TextInput
            label={'Date Of Birth'}
            value={userInfo?.dateOfBirth ? DDMMYYYY(userInfo?.dateOfBirth) : null}
            disabled={true}
          />
        </Grid>
      </GridRow>
    </>
  );
};
export default FIRVerification;
