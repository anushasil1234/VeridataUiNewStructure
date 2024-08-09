import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoResponse from "./widget/no-response";
import { dashboardtextStyle, dropDownLableStyle, inputFieldStyle } from "app";
import { submitConfirmationMsg, toRegister } from "shared/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { CardLayout, hasValue, PageLayout, setLocalStorageItem } from "shared/utils";
import {
  CriticalRecruits,
  Lapsed,
  TotalOffer,
  CumulativeStatus,
  UnderProcess,
  LinkNotSent,
  Verified,
  UpcomingRecruits,
} from "./widget";
import SmallListTable from "shared/utils/small-list-table/small-list-table";
import PrerequisiteInformation from "shared/components/display-information/prerequisite-information";
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";

const HomeView = () => {
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const userDetails = loggedInData[0];
  const dropdownList = useSelector((state) => state.dropdownList);

  const { days } = dropdownList.length > 0 && dropdownList[0];

  const prerquistdata = hasValue(userDetails.isPrerequisiteDataAvailable) && userDetails.isPrerequisiteDataAvailable;
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { getDashboardWidgetCardData, getRemarks, getAppointeeDetails, postAppointeePrerequisiteStatus } = apiSlice[0];
  const { userTypeId, appointeeId, userName, emailId, phone, status } = loggedInData[0];
  const [isPrerequisiteDataAvailable, setIsPrerequisiteDataAvailable] = useState(prerquistdata)

  const [filtertotaloffer, setfiltertotaloffer] = useState(null);
  // const [consentStatus, setConsentStatus] = useState(0);
  const [filterNoResponse, setfilterNoResponse] = useState(null);
  const [filterValidate, setfilterValidate] = useState(null);
  const [filterLapsed, setfilterLapsed] = useState(null);
  const [filterUnderProcess, setfilterUnderProcess] = useState(null);
  const [filterNotValidate, setfilterNotValidate] = useState(null);
  const [dayRange, setDayRange] = useState(30);
  const [dayRangePayLoad, setDayRangePayLoad] = useState();
  const [remarkList, setRemarkList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const functionSlice = useSelector(state => state.functionSlice);
  const { openViewModel, openConsentModal, openInfoModel, openConfirmationYesNoModal } = functionSlice[0];
  const consentStatus = loggedInData[0]?.consentStatus;
  const dispatch = useDispatch();
  const setDashboardWidgetCardData = async (dayRange) => {
    const isfilterd = !(dayRange === "A");
    const filterday = dayRange === "A" ? 0 : dayRange;
    const response = await getDashboardWidgetCardData(filterday, isfilterd);
    if (response) {
      const { responseInfos } = response;
      responseInfos &&
        responseInfos.length > 0 &&
        responseInfos.forEach((widgetObject) => {
          const { widgetTypeCode, widgetValue } = widgetObject;
          if (widgetTypeCode === "TOTLOFFR") {
            setfiltertotaloffer(widgetValue);
          }
          if (widgetTypeCode === "NORES") {
            setfilterNoResponse(widgetValue);
          }
          if (widgetTypeCode === "NTVRFD") {
            setfilterNotValidate(widgetValue);
          }
          if (widgetTypeCode === "VIRFD") {
            setfilterValidate(widgetValue);
          }
          if (widgetTypeCode === "UNDPRCS") {
            setfilterUnderProcess(widgetValue);
          }
          if (widgetTypeCode === "LAPSED") {
            setfilterLapsed(widgetValue);
          }
        });
    }
  };

  const handleYes = () => {
    submitPrerequisiteStatus(4, 'PREREQCNFYES')
    return;
  }

  const handleNo = () => {
    submitPrerequisiteStatus(5, 'PREREQCNFNO')
    return;
  }

  const submitPrerequisiteStatus = async (consentStatusId, consentStatusCode) => {
    const postConsentpayLoad = {
      appointeeId: appointeeId,
      ConsentStatus: consentStatusId,
      ConsentStatusCode: consentStatusCode,
      userId: userDetails?.userId
    }
    const response = await postAppointeePrerequisiteStatus(postConsentpayLoad);
    setIsPrerequisiteDataAvailable(consentStatusCode === 'PREREQCNFYES');
    console.log("isPrerequisiteDataAvailable", consentStatusCode === 'PREREQCNFYES')
    if (response) {
      const { responseInfo } = response;
      if (responseInfo === 'success') {
        setLocalStorageItem("pfc-user", {
          ...userDetails,
          isPrerequisiteDataAvailable: consentStatusCode === 'PREREQCNFYES',
          // IsConsentProcessed: isConsentProcessed,
        });
        dispatch(removeLoggedinData());
        // userDetails.consentStatus = consentStatusId;
        dispatch(storeLoggedinData({
          ...userDetails,
          isPrerequisiteDataAvailable: consentStatusCode === 'PREREQCNFYES',
        }));
      }
    }

  }


  const appointeeVerification = () => {

    if (isPrerequisiteDataAvailable && consentStatus !== 1) {
      handleConsent();
      //to do
    } else if (consentStatus === 1) {
      navigateTo(toRegister);
    }
  }

  const handlePrerequisiteDataConsent = async () => {
    if (!isPrerequisiteDataAvailable) {
      const prerequisiteModelContent = {
        dialogTitle: "Prerequisite Confirmation",
        dialogContentText: "Before verification there are some prerequisites, thats needs to be done...",
        dialogComponent: <PrerequisiteInformation />,
        firstButtonName:"I do",
        secondButtonName:"I don't have prerequisites",
      };
      openConfirmationYesNoModal(prerequisiteModelContent, handleYes, handleNo);
    }else{
      const prerequisiteModelContent = {
        dialogTitle: "Prerequisite Confirmation",
        dialogContentText: "Before verification there are some prerequisites, thats needs to be done...",
        dialogContentComponent: <PrerequisiteInformation />,
      };
      openInfoModel(prerequisiteModelContent);
    }
  }
  const handleConsent = async () => {
    const ConsentModalContent = {
      dialogTitle: "Consent Notification",
      dialogContentText: submitConfirmationMsg,
      consentStatus: consentStatus
    };
    openConsentModal(ConsentModalContent, () => navigateTo(toRegister))
  }
  const setRemarks = async () => {
    const response = await getRemarks(appointeeId);
    if (response) {
      setRemarkList(response.responseInfo);
    }
  };
  const setSubmitStatus = async () => {
    const response = await getAppointeeDetails(appointeeId);
    if (response) {
      setIsSubmit(response.responseInfo.isSubmit);
    }
  };
  useEffect(() => {
    if (userTypeId === 3) {
      setRemarks();
      setSubmitStatus();
    }
  }, []);
  useEffect(() => {
    if (days) {
      setDayRange(days[0].value);
    }
  }, [days]);
  useEffect(() => {
    if (dayRange !== undefined && (userTypeId === 1 || userTypeId === 2)) {
      setDashboardWidgetCardData(dayRange);
      const dayRangePayLoad = dayRange !== "A" ? dayRange : false;
      setDayRangePayLoad(dayRangePayLoad);
    }
  }, [dayRange]);

  return (
    <PageLayout pageName={"Dashboard"}>
      <Box>
        {(userTypeId === 1 || userTypeId === 2) && (
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6} sm={4} md={3} lg={3}>
                <FormControl fullWidth>
                  <Typography sx={{ ...dropDownLableStyle, ml: 0 }}>
                    Select
                  </Typography>
                  {dayRange && (
                    <Select
                      error={false}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dayRange}
                      className="customeTextField"
                      sx={{ ...inputFieldStyle, bgcolor: "#fff", ml: 0 }}
                      onChange={(event) => setDayRange(event.target.value)}
                    >
                      {days &&
                        days.map((element, index) => {
                          return (
                            <MenuItem key={index} value={element.value}>
                              {element.lable}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  )}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={8}
                sx={{ marginBottom: "5px", alignSelf: "end" }}
              >
                <TotalOffer
                  wizValue={
                    filtertotaloffer && filtertotaloffer.widgetTypeValue
                  }
                  wizName={filtertotaloffer && filtertotaloffer.widgetTypeName}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6} sm={4} md={2.4}>
                <LinkNotSent
                  dayRangePayLoad={dayRangePayLoad}
                  wizdata={filterNotValidate}
                  fitToContaner={true}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <NoResponse
                  dayRangePayLoad={dayRangePayLoad}
                  wizdata={filterNoResponse}
                  fitToContaner={true}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <UnderProcess
                  dayRangePayLoad={dayRangePayLoad}
                  wizdata={filterUnderProcess}
                  fitToContaner={true}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Lapsed
                  dayRangePayLoad={dayRangePayLoad}
                  wizdata={filterLapsed}
                  fitToContaner={true}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={2.4}>
                <Verified
                  dayRangePayLoad={dayRangePayLoad}
                  wizdata={filterValidate}
                  fitToContaner={true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <CumulativeStatus />
                    <br />
                    <CriticalRecruits />
                  </Grid>
                  <Grid item xs={12} sm={6} md={8}>
                    <UpcomingRecruits />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
        {userTypeId === 3 && (
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
                  Status: {status}
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Button
                    name="view"
                    sx={{ m: "10px 10px 10px 0px " }}
                    mood="V"
                    variant="contained"
                    color="primary"
                    onClick={() => openViewModel(appointeeId)}
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
                  {!isSubmit ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={appointeeVerification}
                        disabled={!isPrerequisiteDataAvailable}
                      >
                        Verification
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
        )}
      </Box>
    </PageLayout>
  );
};

export default HomeView;
