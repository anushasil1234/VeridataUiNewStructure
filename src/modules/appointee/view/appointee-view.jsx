import { Grid, Typography, Button } from '@mui/material';
import React, { } from 'react';
import { Box, Stack } from '@mui/system';
import { submitBtnStyle } from 'app';
import exclamation from 'assets/images/exclamation.png';
import FullScreenModel from 'shared/utils/modals/fullscreen-modal';
import {
  _addFabStyle,
  buttonStyleSx,
  cardStyle,
  gridContainerStyle,
  listHeadingConteinerStyle,
  listHeadingStyle,
} from 'app';
import ActivityLogDetails from './activity-log-details';
import {
  NA,
  passportFileTypeAlias,
  handicapFileTypeAlias,
  trustEpfoFileTypeAlias,
  tenthCertificateFileTypeAlias,
  otherFileTypeAlias,
  epfoPassbookFileTypeAlias,
  epfoServiceHistoryFileTypeAlias,
} from 'shared/constants/constants';
import ActionPermission from 'shared/components/action-permission/action-permission';
import {
  PersonalInformation,
} from 'shared/components/display-information/personal-information';
import { FileViewComponent } from './file-view-component';
import ProfileSection from './components/ProfileSection';
import ActionButtons from './components/ActionButtons';
import DocumentDetails from './components/DocumentDetails';
import FIRDetailsDialog from './components/FIRDetailsDialog';
import { useAppointeeViewLogic } from './hooks/useAppointeeViewLogic';

let AppointeeViewForm = (props) => {
  const logic = useAppointeeViewLogic(props);
  const {
    t,
    setRemarks,
    isLoading,
    otherFilePayload,
    profileImageBase64,
    fileDataStore,
    verifyIconStyle,
    isSaveStep,
    isAadharVerified,
    isPanVarified,
    isUanVerified,
    isManualPassbook,
    uanNumber,
    appointeeName,
    candidateId,
    nameAsOnAadhar,
    aadhar,
    UAN,
    uanAadhar,
    pan,
    isTrustPassbook,
    trustPfFile,
    filesByAlias,
    manualPassbookFile,
    EPFOServiceHistoryFile,
    isPassportAvailable,
    isInterNationalWorker,
    countryOfOrigin,
    passportNo,
    passportValidFromDate,
    passportValidTillDate,
    visaFile,
    isDLAvailable,
    isDLVarified,
    drivingLicense,
    isBankAccVarified,
    bankAccNumber,
    bankIfscNumber,
    firDetails,
    isFIRModalOpen,
    parsedFIRDetails,
    handleDialogCancel,
    handleClickOnReview,
    handleGetManualVerifiedFilter,
    handleApprove,
    handleReject,
    handleRprocess,
    handleClickOnManualPassbook,
    handlePassbookView,
    handleServiceHistoryView,
    fabProps,
    timelineStates,
    roleTypeEnums,
    userTypeId,
    hasPermission,
    manualVerificationStatus,
    openManualVerifiedView,
    closeManualVerifiedView,
    isProcessed,
    actionIconListDisplay,
    degreeOfRotation,
    handleToggleActionList,
    member,
    dateOfBirth,
    dateOfJoining,
    gender,
    relationshipWithMember,
    nationality,
    mobileNo,
    email,
    qualification,
    maritalStatus,
    isPhysicallyHandicap,
    handicapType,
    handicapFile,
    tenFile,
    otherFile,
    nameAsOnPan,
    setIsFIRModalOpen,
    handelclick,
  } = logic;
  console.log('manualPassbookFile', manualPassbookFile);

  return (
    <Box bgcolor={'#E2E8F0'} sx={{ position: 'relative', borderRadius: '8px' }}>
      <Box sx={gridContainerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{ overflow: 'hidden', borderRadius: '8px' }}>
            <ProfileSection
              isLoading={isLoading}
              otherFilePayload={otherFilePayload}
              profileImageBase64={profileImageBase64}
              fileDataStore={fileDataStore}
              verifyIconStyle={verifyIconStyle}
              isSaveStep={isSaveStep}
              isAadharVerified={isAadharVerified}
              isPanVarified={isPanVarified}
              isUanVerified={isUanVerified}
              isManualPassbook={isManualPassbook}
              uanNumber={uanNumber}
              appointeeName={appointeeName}
              onProfileClick={() => setRemarks(props.appointeeId)}
            />
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>{t('Document Details')}</Typography>
              </Stack>
              <DocumentDetails fieldName={t('Candidate ID')} fieldValue={candidateId} />
              <DocumentDetails
                isVerified={isAadharVerified}
                fieldName={t('Aadhaar Name')}
                fieldValue={nameAsOnAadhar}
              />
              <DocumentDetails
                isVerified={isAadharVerified}
                fieldName={t('Aadhaar Number')}
                fieldValue={aadhar}
              />
              <DocumentDetails isVerified={isUanVerified} fieldName={t('UAN')} fieldValue={UAN} />
              <DocumentDetails fieldName={t('Aadhaar-UAN Link')} fieldValue={uanAadhar} />
              <DocumentDetails
                isVerified={isPanVarified}
                fieldName={t('PAN Number')}
                fieldValue={pan}
              />
              {/* <DocumentDetails
                isVerified={isPanVarified}
                fieldName={t('Name on PAN')}
                fieldValue={nameAsOnPan}
              /> */}
              <DocumentDetails fieldName={t('Trust PF')} fieldValue={isTrustPassbook} />
              {isTrustPassbook === 'Yes' && trustPfFile && (
                <DocumentDetails
                  fieldName={t('Trust PF File')}
                  fieldValue={
                    <FileViewComponent
                      fileType={trustEpfoFileTypeAlias}
                      file={trustPfFile}
                      filesByAlias={filesByAlias}
                      width='50px'
                    />
                  }
                />
              )}
              {isManualPassbook === true && manualPassbookFile && (
                <DocumentDetails
                  fieldName={t('EPFO Passbook File')}
                  fieldValue={
                    <FileViewComponent
                      fileType={epfoPassbookFileTypeAlias}
                      file={manualPassbookFile}
                      filesByAlias={filesByAlias}
                      width='50px'
                    />
                  }
                />
              )}
              {isManualPassbook === true && EPFOServiceHistoryFile && (
                <DocumentDetails
                  fieldName={t('EPFO Service History')}
                  fieldValue={
                    <FileViewComponent
                      fileType={epfoServiceHistoryFileTypeAlias}
                      file={EPFOServiceHistoryFile}
                      filesByAlias={filesByAlias}
                      width='50px'
                    />
                  }
                />
              )}
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Passport Details</Typography>
              </Stack>
              {isPassportAvailable === 'Y' ? (
                <>
                  <DocumentDetails
                    fieldName={t('International Worker')}
                    fieldValue={isInterNationalWorker}
                    width='50px'
                  />
                  <DocumentDetails
                    fieldName={t('Country of Origin')}
                    fieldValue={countryOfOrigin}
                    width='50px'
                  />
                  <DocumentDetails
                    fieldName={t('Passport Number')}
                    fieldValue={passportNo}
                    width='50px'
                  />
                  <DocumentDetails
                    fieldName={t('Passport Issue Date')}
                    fieldValue={passportValidFromDate}
                    width='50px'
                  />
                  <DocumentDetails
                    fieldName={t('Passport Expiry Date')}
                    fieldValue={passportValidTillDate}
                    width='50px'
                  />
                  {visaFile && (
                    <DocumentDetails
                      fieldName={t('Passport File')}
                      fieldValue={
                        <FileViewComponent
                          fileType={passportFileTypeAlias}
                          file={visaFile}
                          width='50px'
                          filesByAlias={filesByAlias}
                        />
                      }
                    />
                  )}
                </>
              ) : (
                <DocumentDetails
                  fieldName={t('Passport Available')}
                  fieldValue={isPassportAvailable === 'N' ? 'No' : NA}
                  width='50px'
                />
              )}
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Driving License Details</Typography>
              </Stack>
              <DocumentDetails
                fieldName={t('Driving License Available')}
                fieldValue={isDLAvailable}
              // width='50px'
              />
              {isDLAvailable === 'Yes' && (
                <>
                  <DocumentDetails
                    isVerified={isDLVarified}
                    fieldName={t('Driving License Number')}
                    fieldValue={drivingLicense}
                  // width='50px'
                  />
                </>
              )}
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Bank Details</Typography>
              </Stack>
              <DocumentDetails
                isVerified={isBankAccVarified}
                fieldName={t('Bank Account Number')}
                fieldValue={bankAccNumber}
              />
              <DocumentDetails
                isVerified={isBankAccVarified}
                fieldName={t('IFSC Code')}
                fieldValue={bankIfscNumber}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5.5}>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>{t('Personal Information')}</Typography>
              </Stack>
              <Grid container spacing={0}>
                <PersonalInformation
                  fieldName={t('Name')}
                  fieldValue={appointeeName}
                  badge={isAadharVerified}
                  badgeTitle={t('AADHAAR Verified')}
                />
                <PersonalInformation
                  fieldName={t('Date of Birth')}
                  fieldValue={dateOfBirth}
                  badge={isAadharVerified}
                  badgeTitle={t('AADHAAR Verified')}
                />
                <PersonalInformation
                  fieldName={'Gender'}
                  fieldValue={gender}
                  badge={isAadharVerified}
                  badgeTitle={t('AADHAAR Verified')}
                />
                <PersonalInformation
                  fieldName={t("Father's / Husband's Name")}
                  fieldValue={member}
                  badge={isAadharVerified}
                  badgeTitle={'Verified'}
                />
                <PersonalInformation
                  fieldName={t('Relationship with Member')}
                  fieldValue={relationshipWithMember}
                />
                <PersonalInformation fieldName={t('Nationality')} fieldValue={nationality} />
                <PersonalInformation
                  fieldName={t('Mobile')}
                  fieldValue={mobileNo}
                  badge={isAadharVerified}
                  badgeTitle={'AADHAAR Verified'}
                />
                <PersonalInformation fieldName={'Email'} fieldValue={email} />
                <PersonalInformation fieldName={t('Qualification')} fieldValue={qualification} />
                <PersonalInformation fieldName={t('Marital Status')} fieldValue={maritalStatus} />
                <PersonalInformation
                  fieldName={t('Physically Handicap')}
                  fieldValue={isPhysicallyHandicap}
                />
                {isPhysicallyHandicap === 'Yes' && (
                  <>
                    <PersonalInformation
                      fieldName={t('Handicap Type')}
                      fieldValue={handicapType ? handicapType : NA}
                    />
                    <PersonalInformation
                      fieldName={t('Handicap Certificate')}
                      fieldValue={
                        handicapFile ? (
                          <FileViewComponent
                            fileType={handicapFileTypeAlias}
                            file={handicapFile}
                            filesByAlias={filesByAlias}
                          />
                        ) : (
                          NA
                        )
                      }
                    />
                  </>
                )}
              </Grid>
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Other Information</Typography>
              </Stack>
              <Grid container spacing={0}>
                <PersonalInformation fieldName={t('Date of Joining')} fieldValue={dateOfJoining} />
                <PersonalInformation
                  fieldName={t('PAN Card')}
                  fieldValue={
                    otherFile ? (
                      <FileViewComponent
                        fileType={otherFileTypeAlias}
                        file={otherFile}
                        filesByAlias={filesByAlias}
                      />
                    ) : (
                      NA
                    )
                  }
                />
                {console.log('1111', process.env.REACT_APP_VARIABLE_CERITIFICATE_10TH)}
                {process.env.REACT_APP_VARIABLE_CERITIFICATE_10TH === 'true' && (
                  <PersonalInformation
                    fieldName={t('10th Pass Certificate')}
                    fieldValue={
                      tenFile ? (
                        <FileViewComponent
                          fileType={tenthCertificateFileTypeAlias}
                          file={tenFile}
                          filesByAlias={filesByAlias}
                        />
                      ) : (
                        NA
                      )
                    }
                  />
                )}
              </Grid>
            </Box>
            <Box sx={{ ...cardStyle }}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>FIR Details</Typography>
              </Stack>
              <PersonalInformation
                fieldName={t('See FIR Details')}
                fieldValue={parsedFIRDetails === 'N' ? 'No' : NA}
                width='50px'
              />
              {Array.isArray(parsedFIRDetails) && parsedFIRDetails.length > 0 && (
                <Button
                  sx={{ ...submitBtnStyle, margin: '5px 0' }}
                  variant='contained'
                  onClick={() => setIsFIRModalOpen(true)}
                >
                  {t('View FIR')}
                </Button>
              )}
            </Box>
            <FIRDetailsDialog open={isFIRModalOpen} onClose={handleDialogCancel} firDetails={parsedFIRDetails} />
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Box
              sx={{
                ...cardStyle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={handleClickOnReview}
                variant='contained'
                sx={{ ...buttonStyleSx }}
                startIcon={
                  <img
                    src={exclamation}
                    alt='exclamation'
                    style={{
                      width: 25,
                      height: 25,
                      filter: 'invert(1) brightness(100%)',
                    }}
                  />
                }
              >
                {t('View Remarks / Issues')}
              </Button>
            </Box>
            {!roleTypeEnums.candidate.includes(userTypeId)
              ? isManualPassbook &&
              (manualVerificationStatus === 'MV' || manualVerificationStatus === 'MRV') &&
              hasPermission &&
              hasPermission['A015'] && (
                <Box
                  sx={{
                    ...cardStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={handelclick}
                    variant='contained'
                    sx={{ ...buttonStyleSx }}
                    startIcon={
                      <img
                        src={exclamation}
                        alt='exclamation'
                        style={{
                          width: 25,
                          height: 25,
                          filter: 'invert(1) brightness(100%)',
                        }}
                      />
                    }
                  >
                    Verify Manually
                  </Button>
                </Box>
              )
              : null}
            {!roleTypeEnums.candidate.includes(userTypeId)
              ? hasPermission &&
              hasPermission['A016'] &&
              ['MV', 'MRV', 'RD'].includes(manualVerificationStatus) && (
                <Box
                  sx={{
                    ...cardStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={() => handleGetManualVerifiedFilter(manualVerificationStatus)}
                    variant='contained'
                    sx={{ ...buttonStyleSx }}
                    startIcon={
                      <img
                        width={18}
                        src={'./playground_assets/redirect.svg'}
                        alt='YourSVG'
                        style={{ width: '100%', height: 'auto' }}
                      />
                    }
                  >
                    Visit Manual Verification Page
                  </Button>
                </Box>
              )
              : null}
            <Box sx={{ margin: '1rem 0' }}>
              <ActivityLogDetails activityStatus={timelineStates} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {!roleTypeEnums.candidate.includes(userTypeId) && (
        <ActionButtons
          appointeeStatus={props.appointeeStatus}
          actionIconListDisplay={actionIconListDisplay}
          isProcessed={isProcessed}
          isSaveStep={isSaveStep}
          hasPermission={hasPermission}
          uanNumber={uanNumber}
          degreeOfRotation={degreeOfRotation}
          handleToggleActionList={handleToggleActionList}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleRprocess={handleRprocess}
          handleClickOnReview={handleClickOnReview}
          handlePassbookView={handlePassbookView}
          handleServiceHistoryView={handleServiceHistoryView}
          fabProps={fabProps}
        />
      )}
    </Box>
  );
};
const UnWrappedAppointeeView = (props) => {
  return (
    <FullScreenModel
      headerText={'Appointee Details'}
      open={props.openView}
      fullScreen={true}
      closeModel={props.closeViewModel}
      content={<AppointeeViewForm {...props} />}
    />
  );
};
const AppointeeView = ActionPermission(UnWrappedAppointeeView);
export default AppointeeView;
