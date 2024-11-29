import { Box, Button, Grid, Typography, Chip, Tooltip, tooltipClasses, Fab } from "@mui/material";
import { styled } from '@mui/material/styles';
import { getStatusTooltip, getTooltipforStatus, toReuploadDoc } from "shared/constants/constants";
import React, { useEffect, useState } from "react";

import {
  dashboardtextStyle,
  getStatusChipStyle,
  pendingverificationsx,
  primaryFabStyle,
  statusBoxstyle,
  statusstyle,
  subHeadingContentTextStyle,
} from "app";
import { submitConfirmationMsg, toRegister } from "shared/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  CardLayout,
  hasValue,
  PageLayout,
  setLocalStorageItem,
} from "shared/utils";

import SmallListTable from "shared/utils/small-list-table/small-list-table";
import PrerequisiteInformation from "shared/components/display-information/prerequisite-information";
import {
  removeLoggedinData,
  storeLoggedinData,
} from "store/slices/login-slice";
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";
import Button1 from 'shared/utils/button/button1';
import { Info } from "@mui/icons-material";
import { dark } from "@mui/material/styles/createPalette";

const CandidateView = () => {
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const userDetails = loggedInData[0];

  const prerquistdata =
    hasValue(userDetails.isPrerequisiteDataAvailable) &&
    userDetails.isPrerequisiteDataAvailable;
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { getRemarks, getAppointeeDetails, postAppointeePrerequisiteStatus } =
    apiSlice[0];
  const {
    userTypeId,
    appointeeId,
    userName,
    emailId,
    phone,
    status,
    statusCode,
    isProcessed,
    candidateId
  } = loggedInData[0];
 
  const [isPrerequisiteDataAvailable, setIsPrerequisiteDataAvailable] =
    useState(prerquistdata);
  const [loading, setLoading] = useState(false);

  const [remarkList, setRemarkList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const startLoader = () => setLoading(true);
  const stopLoader = () => setLoading(false);
  const functionSlice = useSelector((state) => state.functionSlice);
  const {
    openViewModel,
    openConsentModal,
    openInfoModel,
    openConfirmationYesNoModal,
  } = functionSlice[0];
  const consentStatus = loggedInData[0]?.consentStatus;

  const dispatch = useDispatch();

  const handlePrerequisite = (statusId, statusCode) => {
    submitPrerequisiteStatus(statusId, statusCode);
  };

  const handleYes = () => handlePrerequisite(4, "PREREQCNFYES");
  const handleNo = () => handlePrerequisite(5, "PREREQCNFNO");

  const submitPrerequisiteStatus = async (
    consentStatusId,
    consentStatusCode
  ) => {
    const postConsentpayLoad = {
      appointeeId: appointeeId,
      ConsentStatus: consentStatusId,
      ConsentStatusCode: consentStatusCode,
      userId: userDetails?.userId,
    };
    const response = await postAppointeePrerequisiteStatus(postConsentpayLoad);
    setIsPrerequisiteDataAvailable(consentStatusCode === "PREREQCNFYES");
    if (response) {
      const { responseInfo } = response;
      if (responseInfo === "success") {
        setLocalStorageItem("pfc-user", {
          ...userDetails,
          isPrerequisiteDataAvailable: consentStatusCode === "PREREQCNFYES",
        });
        dispatch(removeLoggedinData());
        dispatch(
          storeLoggedinData({
            ...userDetails,
            isPrerequisiteDataAvailable: consentStatusCode === "PREREQCNFYES",
          })
        );
      }
    }
  };

  const appointeeVerification = () => {
    if (isPrerequisiteDataAvailable && consentStatus !== 1) {
      handleConsent();
    } else if (consentStatus === 1) {
      navigateTo(toRegister);
    }
  };

  const handlePrerequisiteDataConsent = async () => {
    if (!isPrerequisiteDataAvailable) {
      const prerequisiteModelContent = {
        dialogTitle: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Prerequisite Confirmation</Typography>
          </div>
        ),
        dialogContentText: (
          <>
            <Typography sx={subHeadingContentTextStyle}>
              Before verification there are some prerequisites, thats needs to
              be done...
            </Typography>
            <Typography> </Typography>
          </>
        ),
        dialogComponent: <PrerequisiteInformation />,
        firstButtonName: "I do",
        secondButtonName: "I don't have prerequisites",
        fullWidth: true,
        mxWidth: "md",
      };
      openConfirmationYesNoModal(prerequisiteModelContent, handleYes, handleNo);
    } else {
      const prerequisiteModelContent = {
        dialogTitle: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Prerequisite Confirmation</Typography>
          </div>
        ),
        dialogContentText: (
          <>
            <Typography sx={subHeadingContentTextStyle}>
              Before verification there are some prerequisites, thats needs to
              be done...
            </Typography>
            <Typography></Typography>
          </>
        ),
        dialogContentComponent: <PrerequisiteInformation />,
        fullWidth: true,
        maxWidth: "md",
      };
      openInfoModel(prerequisiteModelContent);
    }
  };

  const handleConsent = async () => {
    const ConsentModalContent = {
      dialogTitle: "Consent Notification",
      dialogContentText: submitConfirmationMsg,
      consentStatus: consentStatus,
    };
    openConsentModal(ConsentModalContent, () => navigateTo(toRegister));
  };
  const setRemarks = async () => {
    const response = await getRemarks(appointeeId);
    if (response) {
      setRemarkList(response.responseInfo);
    }
  };
  const setSubmitStatus = async () => {
    const response = await getAppointeeDetails(appointeeId);
    if (response) {
      setIsSubmit(
        response.responseInfo.isSubmit || response.responseInfo.isProcessed
      );
    }
  };
  const appointeeDocReupload = async () => {
    navigateTo(toReuploadDoc);
  };
  useEffect(() => {
    if (userTypeId === 3) {
      setRemarks();
      setSubmitStatus();
    }
  }, []);
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  return (
    <>
      {loading && <CircularIndeterminate />}
      <PageLayout pageName={"Dashboard"}>
        <Box>
          <>
            <CardLayout>
              <Grid
                py={5}
                sx={dashboardtextStyle}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={3} xs={12}>
                  Name: {userName}
                </Grid>
                <Grid item lg={3} xs={12}>
                  Email: {emailId}
                </Grid>
                <Grid item lg={3} xs={12}>
                  Phone: {phone}
                </Grid>
                <Grid item lg={3} xs={12}>
                  Candidate Id: {candidateId}
                </Grid>
                <Grid item lg={3} xs={12}>
                  Status:
                  <Tooltip
                    title={
                      <Typography sx={{ maxWidth: 200, whiteSpace: "normal" }}>
                        {getTooltipforStatus(statusCode)}
                      </Typography>
                    }
                    arrow
                    placement="bottom"
                  >
                    <Chip
                      label={status}
                      sx={{
                        ...getStatusChipStyle(status),

                        marginLeft: "8px",
                      }}
                      size="small"
                      aria-label={`Status: ${status}`}
                    />
                  </Tooltip>
                  <Tooltip backgroundColor="dark"
                    arrow
                    title={
                      <Box sx={{... statusBoxstyle}}>
                        <Typography variant="body2" sx={{... statusstyle}}>
                          <strong>Submitted:</strong> Your data has been submitted successfully.
                        </Typography>
                        <Typography variant="body2" sx={{... statusstyle }}>
                          <strong>Approved:</strong> Approved successfully.
                        </Typography>
                        <Typography variant="body2" sx={{...statusstyle }}>
                          <strong>Ongoing:</strong> Verification in progress.
                        </Typography>
                        <Typography variant="body2" sx={{...statusstyle}}>
                          <strong>Rejected:</strong> You are rejected by Admin.
                        </Typography>
                        <Typography variant="body2" sx={{...statusstyle }}>
                          <strong>Approved Manually:</strong> The data has been manually verified and approved by the admin.
                        </Typography>
                        <Typography variant="body2" sx={{...statusstyle }}>
                          <strong>No Response:</strong> There has been no response yet.
                        </Typography>
                        <Typography variant="body2" sx={{...statusstyle }}>
                          <strong>Doc Reupload:</strong> Request for Doc Reupload.
                        </Typography>
                      </Box>
                    }
                  >
                    <Fab
                      variant="contained"
                      size="small"

                      sx={{ ...primaryFabStyle, ml: 5 }}
                    >
                      <Info width={18} sx={{ color: "#fff" }} />
                    </Fab>
                  </Tooltip>
                </Grid>

                <Grid item lg={4} xs={12}>
                  <Button
                    name="view"
                    sx={{ m: "10px 10px 10px 0px " }}
                    mood="V"
                    variant="contained"
                    color="primary"
                    onClick={() => openViewModel(appointeeId)}
                    disabled={consentStatus === 0 || consentStatus === 5}
                  >
                    My Info
                  </Button>
                  <Button
                    name="Prerequisite"
                    sx={{ m: "10px 10px 10px 0px " }}
                    mood="V"
                    variant="contained"
                    color="primary"
                    onClick={handlePrerequisiteDataConsent}
                  >
                    Prerequisite Details
                  </Button>
                  {statusCode === "DCRUPLD" && isSubmit ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={appointeeDocReupload}
                        sx={{...pendingverificationsx}}
                      >
                        Pending Verification
                      </Button>
                    </>
                  ) : null}

                  {!isSubmit ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={appointeeVerification}
                        disabled={!isPrerequisiteDataAvailable}
                        sx={{...pendingverificationsx }}
                      >
                        {(consentStatus === 4 ||
                          consentStatus === 0 ||
                          consentStatus === 5) &&
                          isProcessed !== true
                          ? "Start Verification"
                          : "Pending Verification"}
                      </Button>
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </CardLayout>
            <Box mt={2}>
              <CardLayout>
                <SmallListTable rows={remarkList} />
              </CardLayout>
            </Box>
          </>
        </Box>
      </PageLayout>
    </>
  );
};

export default CandidateView;
