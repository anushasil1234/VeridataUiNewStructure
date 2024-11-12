import { Box, Button, Grid, Typography, Chip, Tooltip } from "@mui/material";

import { getStatusTooltip } from "shared/constants/constants";
import React, { useEffect, useState } from "react";

import {
  dashboardtextStyle,
  getStatusChipStyle,
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
  } = loggedInData[0];
  console.log("logindata", loggedInData[0]);
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
  const appointeeDocReupload = async () => {};
  useEffect(() => {
    if (userTypeId === 3) {
      setRemarks();
      setSubmitStatus();
    }
  }, []);

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
                <Grid item lg={4} xs={12}>
                  Name: {userName}
                </Grid>
                <Grid item lg={4} xs={12}>
                  Email: {emailId}
                </Grid>
                <Grid item lg={4} xs={12}>
                  Phone: {phone}
                </Grid>
                <Grid item lg={4} xs={12}>
                  Status:
                  <Tooltip
                    title={
                      <Typography sx={{ maxWidth: 200, whiteSpace: "normal" }}>
                        {getStatusTooltip(status)}
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
                        sx={{
                          boxShadow: 10, // Elevation effect
                          fontSize: "1rem", // Larger font for emphasis
                          border: "2px solid rgba(255, 255, 255, 0.8)", // White border for emphasis
                          borderRadius: "8px", // Rounded corners for a modern look
                          "&:hover": {
                            boxShadow: 20, // Stronger elevation on hover
                            transform: "scale(1.05)", // Slight scale up on hover
                          },
                          transition: "box-shadow 0.3s, transform 0.3s", // Smooth transition for elevation and scale
                        }}
                      >
                        {" "}
                        "Document Reupload"
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
                        sx={{
                          boxShadow: 10, // Elevation effect
                          fontSize: "1rem", // Larger font for emphasis
                          border: "2px solid rgba(255, 255, 255, 0.8)", // White border for emphasis
                          borderRadius: "8px", // Rounded corners for a modern look
                          "&:hover": {
                            boxShadow: 20, // Stronger elevation on hover
                            transform: "scale(1.05)", // Slight scale up on hover
                          },
                          transition: "box-shadow 0.3s, transform 0.3s", // Smooth transition for elevation and scale
                        }}
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
