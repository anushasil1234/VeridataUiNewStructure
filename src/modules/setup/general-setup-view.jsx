import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  casesyle,
  inputFieldStyle,
  inputPropsStyle,
  labelDividerStyle,
  lable1Style,
  lable2Style,
  stepContainerStyle,
  stepHeadingStyle,
  stepNumberContainerStyle,
} from "app";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { configerationSetUp, getConfigedData } from "server/apis";
import ActionPermission from "shared/components/action-permission/action-permission";
import { CardLayout,validationsCheck } from "shared/utils";
import InputCard from "shared/utils/layout/input-card";

const DetailesHeadingSection = ({ prop }) => {
  const { step, heading } = prop;
  return (
    <Stack sx={stepContainerStyle}>
      <Stack sx={stepNumberContainerStyle}>
        <Typography fontWeight={500}>{step}</Typography>
      </Stack>
      <Typography sx={stepHeadingStyle}>{heading}</Typography>
    </Stack>
  );
};
const label = { inputProps: { "aria-label": "Color switch demo" } };
const UnwrappedGeneralSetupView = (props) => {
  const { hasPermission } = props;
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);

  // const { configerationSetUp, getConfigedData } = apiSlice[0];
  // const {  getConfigedData } = apiSlice[0];
  const { userId } = loggedInData[0];

  const [criticalDays, setCriticalDays] = useState(null);
  const [linkNotBeSentLvl1, setLinknotSentLvl1] = useState(false);
  const [linkNotBeSentLvl2, setLinknotSentLvl2] = useState(false);
  const [linkNotBeSentLvl3, setLinknotSentLvl3] = useState(false);
  const [noResponseLvl1, setNoResponseLvl1] = useState(false);
  const [noResponseLvl2, setNoResponseLvl2] = useState(false);
  const [noResponseLvl3, setNoResponseLvl3] = useState(false);
  const [noSubmissionLvl1, setNoSubmissionLvl1] = useState(false);
  const [noSubmissionLvl2, setNoSubmissionLvl2] = useState(false);
  const [noSubmissionLvl3, setNoSubmissionLvl3] = useState(false);
  const [DOJ1Lvl1, setDOJ1Lvl1] = useState(false);
  const [DOJ1Lvl2, setDOJ1Lvl2] = useState(false);
  const [DOJ1Lvl3, setDOJ1Lvl3] = useState(false);
  const [emailaddressLvl1, setEmailAddressLvl1] = useState(null);
  const [emailaddressLvl2, setEmailAddressLvl2] = useState(null);
  const [emailaddressLvl3, setEmailAddressLvl3] = useState(null);
  const [escalationTriggerDaysNRMLvl1, setEscalationTriggerDaysNRMLvl1] =
    useState("");
  const [escalationTriggerDaysNRMLvl2, setEscalationTriggerDaysNRMLvl2] =
    useState("");
  const [escalationTriggerDaysNRMLvl3, setEscalationTriggerDaysNRMLvl3] =
    useState("");
  const [escalationTriggerDaysCRTLvl1, setEscalationTriggerDaysCRTLvl1] =
    useState("");
  const [escalationTriggerDaysCRTLvl2, setEscalationTriggerDaysCRTLvl2] =
    useState("");
  const [escalationTriggerDaysCRTLvl3, setEscalationTriggerDaysCRTLvl3] =
    useState("");
  const [emailEsDetailsRestLvl1, setEmailEsDetailsRestLvl1] = useState(null);
  const [emailEsDetailsRestLvl2, setEmailEsDetailsRestLvl2] = useState(null);
  const [emailEsDetailsRestLvl3, setEmailEsDetailsRestLvl3] = useState(null);
  const [NOLINKCaseId, setNOLINKCaseId] = useState();
  const [NOSUBCaseId, setNOSUBCaseId] = useState();
  const [NORESCaseId, setNORESCaseId] = useState();
  const [DOJ1WCaseId, setDOJ1WCaseId] = useState();
  const [linkNotSentEmailLvl1, setLinkNotSentEmailLvl1] = useState();
  const [linkNotSentEmailLvl2, setLinkNotSentEmailLvl2] = useState();
  const [linkNotSentEmailLvl3, setLinkNotSentEmailLvl3] = useState();
  const [noResponseEmailLvl1, setNoResponseEmailLvl1] = useState();
  const [noResponseEmailLvl2, setNoResponseEmailLvl2] = useState();
  const [noResponseEmailLvl3, setNoResponseEmailLvl3] = useState();
  const [noSubmissionEmailLvl1, setNoSubmissionEmailLvl1] = useState();
  const [noSubmissionEmailLvl2, setNoSubmissionEmailLvl2] = useState();
  const [noSubmissionEmailLvl3, setNoSubmissionEmailLvl3] = useState();
  const [DOJ1EmailLvl1, setDOJ1EmailLvl1] = useState();
  const [DOJ1EmailLvl2, setDOJ1EmailLvl2] = useState();
  const [DOJ1EmailLvl3, setDOJ1EmailLvl3] = useState();
  const [emailEsDetailsRestCrtlLvl1, setEmailEsDetailsRestCrtlLvl1] =
    useState();
  const [emailEsDetailsRestCrtlLvl2, setEmailEsDetailsRestCrtlLvl2] =
    useState();
  const [emailEsDetailsRestCrtlLvl3, setEmailEsDetailsRestCrtlLvl3] =
    useState();
  const [gracePeriod, setGracePeriod] = useState();

  const setupCaseDetailsValues = (
    setupCaseDetailsList,
    setLinknotSent,
    setNoResponse,
    setNoSubmission,
    setDOJ1,
    setUpValues
  ) => {
    setupCaseDetailsList.forEach((setupCase) => {
      const { setupCaseCode } = setupCase;
      const value = setupCase[setUpValues];
      if (setLinknotSent && setupCaseCode === "NOLINK") {
        setLinknotSent(value);
      }
      if (setNoResponse && setupCaseCode === "NORES") {
        setNoResponse(value);
      }
      if (setNoSubmission && setupCaseCode === "NOSUB") {
        setNoSubmission(value);
      }
      if (setDOJ1 && setupCaseCode === "DOJ1W") {
        setDOJ1(value);
      }
    });
  };
  const setConfigedData = async () => {
    const response = await getConfigedData();
    if (response) {
      const {
        emailEscalationLevelDetails,
        emailEscalationSetupDetails,
        criticalDays,
        gracePeriod,
      } = response.responseInfo;
      setCriticalDays(criticalDays);
      setGracePeriod(gracePeriod);
      emailEscalationLevelDetails &&
        emailEscalationLevelDetails.forEach((emailEscalationLevelDetails) => {
          const { emailaddress, noOfDays, setupAlias, levelCode, ...rest } =
            emailEscalationLevelDetails;
          if (setupAlias === "NRML") {
            if (levelCode === "LVL1") {
              setEmailAddressLvl1(...emailaddress);
              setEscalationTriggerDaysNRMLvl1(noOfDays);
              setEmailEsDetailsRestLvl1(rest);
            }
            if (levelCode === "LVL2") {
              setEmailAddressLvl2(...emailaddress);
              setEscalationTriggerDaysNRMLvl2(noOfDays);
              setEmailEsDetailsRestLvl2(rest);
            }
            if (levelCode === "LVL3") {
              setEmailAddressLvl3(...emailaddress);
              setEscalationTriggerDaysNRMLvl3(noOfDays);
              setEmailEsDetailsRestLvl3(rest);
            }
          }
          if (setupAlias === "CRITCL") {
            if (levelCode === "LVL1") {
              setEscalationTriggerDaysCRTLvl1(noOfDays);
              setEmailEsDetailsRestCrtlLvl1(rest);
            }
            if (levelCode === "LVL2") {
              setEscalationTriggerDaysCRTLvl2(noOfDays);
              setEmailEsDetailsRestCrtlLvl2(rest);
            }
            if (levelCode === "LVL3") {
              setEscalationTriggerDaysCRTLvl3(noOfDays);
              setEmailEsDetailsRestCrtlLvl3(rest);
            }
          }
          // todo  make it less
        });
      emailEscalationSetupDetails &&
        emailEscalationSetupDetails.forEach(
          ({ levelCode, setupCaseDetails }) => {
            if (levelCode === "LVL1") {
              setupCaseDetailsValues(
                setupCaseDetails,
                setNOLINKCaseId,
                setNOSUBCaseId,
                setNORESCaseId,
                setDOJ1WCaseId,
                "setupCaseId"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinknotSentLvl1,
                setNoResponseLvl1,
                setNoSubmissionLvl1,
                setDOJ1Lvl1,
                "setupCaseOption"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinkNotSentEmailLvl1,
                setNoResponseEmailLvl1,
                setNoSubmissionEmailLvl1,
                null,
                "caseEmailAddress"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                null,
                null,
                null,
                setDOJ1EmailLvl1,
                "caseEmailAddress"
              );
            }
            if (levelCode === "LVL2") {
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinknotSentLvl2,
                setNoResponseLvl2,
                setNoSubmissionLvl2,
                setDOJ1Lvl2,
                "setupCaseOption"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinkNotSentEmailLvl2,
                setNoResponseEmailLvl2,
                setNoSubmissionEmailLvl2,
                null,
                "caseEmailAddress"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                null,
                null,
                null,
                setDOJ1EmailLvl2,
                "caseEmailAddress"
              );
            }
            if (levelCode === "LVL3") {
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinknotSentLvl3,
                setNoResponseLvl3,
                setNoSubmissionLvl3,
                setDOJ1Lvl3,
                "setupCaseOption"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                setLinkNotSentEmailLvl3,
                setNoResponseEmailLvl3,
                setNoSubmissionEmailLvl3,
                null,
                "caseEmailAddress"
              );
              setupCaseDetailsValues(
                setupCaseDetails,
                null,
                null,
                null,
                setDOJ1EmailLvl3,
                "caseEmailAddress"
              );
            }
          }
        );
    }
  };
  const handleClickOnSave = async () => {
    const lvl1Id = emailEsDetailsRestLvl1.levelId;
    const lvl2Id = emailEsDetailsRestLvl2.levelId;
    const lvl3Id = emailEsDetailsRestLvl3.levelId;
    const lvl4Id = emailEsDetailsRestCrtlLvl1.levelId;
    const lvl5Id = emailEsDetailsRestCrtlLvl2.levelId;
    const lvl6Id = emailEsDetailsRestCrtlLvl3.levelId;
    const payLoad = {
      emailEscalationLevel: [
        {
          levelId: lvl1Id,
          emailaddress: [emailaddressLvl1],
          noOfDays: escalationTriggerDaysNRMLvl1,
        },
        {
          levelId: lvl2Id,
          emailaddress: [emailaddressLvl2],
          noOfDays: escalationTriggerDaysNRMLvl2,
        },
        {
          levelId: lvl3Id,
          emailaddress: [emailaddressLvl3],
          noOfDays: escalationTriggerDaysNRMLvl3,
        },
        {
          levelId: lvl4Id,
          emailaddress: [emailaddressLvl1],
          noOfDays: escalationTriggerDaysCRTLvl1,
        },
        {
          levelId: lvl5Id,
          emailaddress: [emailaddressLvl2],
          noOfDays: escalationTriggerDaysCRTLvl2,
        },
        {
          levelId: lvl6Id,
          emailaddress: [emailaddressLvl3],
          noOfDays: escalationTriggerDaysCRTLvl3,
        },
      ],
      emailEscalationSetup: [
        {
          levelId: lvl1Id,
          caseId: NOLINKCaseId,
          caseOption: linkNotBeSentLvl1,
          caseEmail: linkNotSentEmailLvl1,
        },
        {
          levelId: lvl2Id,
          caseId: NOLINKCaseId,
          caseOption: linkNotBeSentLvl2,
          caseEmail: linkNotSentEmailLvl2,
        },
        {
          levelId: lvl3Id,
          caseId: NOLINKCaseId,
          caseOption: linkNotBeSentLvl3,
          caseEmail: linkNotSentEmailLvl3,
        },
        {
          levelId: lvl1Id,
          caseId: NORESCaseId,
          caseOption: noResponseLvl1,
          caseEmail: noResponseEmailLvl1,
        },
        {
          levelId: lvl2Id,
          caseId: NORESCaseId,
          caseOption: noResponseLvl2,
          caseEmail: noResponseEmailLvl2,
        },
        {
          levelId: lvl3Id,
          caseId: NORESCaseId,
          caseOption: noResponseLvl3,
          caseEmail: noResponseEmailLvl3,
        },
        {
          levelId: lvl1Id,
          caseId: NOSUBCaseId,
          caseOption: noSubmissionLvl1,
          caseEmail: noSubmissionEmailLvl1,
        },
        {
          levelId: lvl2Id,
          caseId: NOSUBCaseId,
          caseOption: noSubmissionLvl2,
          caseEmail: noSubmissionEmailLvl2,
        },
        {
          levelId: lvl3Id,
          caseId: NOSUBCaseId,
          caseOption: noSubmissionLvl3,
          caseEmail: noSubmissionEmailLvl3,
        },
        {
          levelId: lvl1Id,
          caseId: DOJ1WCaseId,
          caseOption: DOJ1Lvl1,
          caseEmail: DOJ1EmailLvl1,
        },
        {
          levelId: lvl2Id,
          caseId: DOJ1WCaseId,
          caseOption: DOJ1Lvl2,
          caseEmail: DOJ1EmailLvl2,
        },
        {
          levelId: lvl3Id,
          caseId: DOJ1WCaseId,
          caseOption: DOJ1Lvl3,
          caseEmail: DOJ1EmailLvl3,
        },
      ],
      criticalDays,
      gracePeriod,
      userId,
    };
    const response = await configerationSetUp(payLoad);
    if (response) {
      setConfigedData();
    }
  };
  useEffect(() => {
    if (hasPermission) {
      setConfigedData();
    }
  }, [hasPermission]);
  return (
    <Box my={"20px"}>
      <Grid
        sx={{ marginBottom: "10px" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid container rowSpacing={1} columnSpacing={2.5} item xs={12}>
          <Grid item xs={12} >
            <DetailesHeadingSection
              sx={{ paddingLeft: "4px"}}
              prop={{ step: "1", heading: "Email Notification Configuration" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CardLayout>
            <InputCard title="Escalation Level">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={2.5}
                item
                xs={12}
                md={12}
                lg={12}
                marginRight={2}
              >
                <Grid
                  sx={{ paddingLeft: "4px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={2.5}
                      item
                      xs={12}
                      md={12}
                    >
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography sx={lable2Style}>
                          {`Email ID for Escalation Level 1`}{" "}
                        </Typography>
                        <TextField
                          error={!validationsCheck(emailaddressLvl1, 'email')}
                          style={inputFieldStyle}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) => setEmailAddressLvl1(e.target.value)}
                          value={emailaddressLvl1}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                           
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography sx={lable2Style}>
                          {`Email ID for Escalation Level 2`}{" "}
                        </Typography>
                        <TextField
                          error={!validationsCheck(emailaddressLvl2, 'email')}
                          style={inputFieldStyle}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) => setEmailAddressLvl2(e.target.value)}
                          value={emailaddressLvl2}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                        
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Typography sx={lable2Style}>
                          {`Email ID for Escalation Level 3`}{" "}
                        </Typography>
                        <TextField
                         error={!validationsCheck(emailaddressLvl3, 'email')}
                          style={inputFieldStyle}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) => setEmailAddressLvl3(e.target.value)}
                          value={emailaddressLvl3}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                         
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </InputCard>
            <InputCard title="Criticality for Escalation">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={2.5}
                item
                xs={12}
                md={12}
                lg={12}
                justifyContent={"space-between"}
              >
                <Grid item xs={12} md={4} >
                  <FormControl fullWidth>
                    <Typography
                      sx={lable2Style}
                    >{`No. of days to trigger Escalation at Level 1`}</Typography>
                    {escalationTriggerDaysNRMLvl1 !== undefined && (
                      <Select
                        error={false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="customeTextField"
                        sx={inputFieldStyle}
                        // inputProps={{
                        //   style: inputPropsStyle
                        // }}
                        onChange={(e) => {
                          setEscalationTriggerDaysNRMLvl1(e.target.value);
                        }}
                        value={escalationTriggerDaysNRMLvl1}
                      >
                        {new Array(8).fill(null).map((element, index) => {
                          const days = 7 + index;
                          return (
                            <MenuItem key={index} value={days}>{`${days} days`}</MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Typography
                      sx={lable2Style}
                    >{`No. of days to trigger Escalation at Level 2`}</Typography>
                    {escalationTriggerDaysNRMLvl2 !== undefined && (
                      <Select
                        error={false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="customeTextField"
                        sx={inputFieldStyle}
                        onChange={(e) => {
                          setEscalationTriggerDaysNRMLvl2(e.target.value);
                        }}
                        value={escalationTriggerDaysNRMLvl2}
                      >
                        {new Array(8).fill(null).map((element, index) => {
                          const days = 15 + index;
                          return (
                            <MenuItem key={index} value={days}>{`${days} days`}</MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <Typography
                      sx={lable2Style}
                    >{`No. of days to trigger Escalation at Level 3`}</Typography>
                    {escalationTriggerDaysNRMLvl3 !== undefined && (
                      <Select
                        error={false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className="customeTextField"
                        sx={inputFieldStyle}
                        onChange={(e) => {
                          setEscalationTriggerDaysNRMLvl3(e.target.value);
                        }}
                        value={escalationTriggerDaysNRMLvl3}
                      >
                        {new Array(8).fill(null).map((element, index) => {
                          const days = 15 + index;
                          return (
                            <MenuItem key={index} value={days}>{`${days} days`}</MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </InputCard>
          </CardLayout>
        </Grid>
        <Grid item xs={12}>
          <CardLayout>
            <InputCard title="Case Based Escalation setup">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={2.5}
                item
                xs={12}
                md={12}
                lg={12}
              >
                <Grid
                  sx={{ paddingLeft: "20px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      sx={{ alignItems: "center" }}
                      rowSpacing={1}
                      columnSpacing={2.5}
                      item
                      xs={12}
                      md={12}
                    >
                      <Grid item xs={12} md={3}>
                        <Typography sx={casesyle}>
                          {"Link could not be sent"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl>
                          <Typography
                            sx={lable1Style}
                          >{`Receive email for Escalation Level 1`}</Typography>
                          <Divider sx={labelDividerStyle} />
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setLinknotSentLvl1(e.target.checked)
                              }
                              checked={linkNotBeSentLvl1}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                          <TextField
                           error={!validationsCheck(linkNotSentEmailLvl1, 'email')}
                            type="email"
                            className="customeTextField"
                            variant="outlined"
                            defaultValue={" "}
                            onChange={(e) =>
                              setLinkNotSentEmailLvl1(e.target.value)
                            }
                            value={linkNotSentEmailLvl1}
                            inputStyle={{ padding: 0 }}
                            inputProps={{
                              style: inputPropsStyle,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl>
                          <Typography
                            sx={lable1Style}
                          >{`Receive email for Escalation Level 2`}</Typography>
                          <Divider sx={labelDividerStyle} />
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setLinknotSentLvl2(e.target.checked)
                              }
                              checked={linkNotBeSentLvl2}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                          <TextField
                           error={!validationsCheck(linkNotSentEmailLvl2, 'email')}
                            type="email"
                            className="customeTextField"
                            variant="outlined"
                            defaultValue={" "}
                            onChange={(e) =>
                              setLinkNotSentEmailLvl2(e.target.value)
                            }
                            value={linkNotSentEmailLvl2}
                            inputStyle={{ padding: 0 }}
                            inputProps={{
                              style: inputPropsStyle,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl>
                          <Typography
                            sx={lable1Style}
                          >{`Receive email for Escalation Level 3`}</Typography>
                          <Divider sx={labelDividerStyle} />
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setLinknotSentLvl3(e.target.checked)
                              }
                              checked={linkNotBeSentLvl3}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                          <TextField
                            error={!validationsCheck(linkNotSentEmailLvl3, 'email')}
                           
                            type="email"
                            className="customeTextField"
                            variant="outlined"
                            defaultValue={" "}
                            onChange={(e) =>
                              setLinkNotSentEmailLvl3(e.target.value)
                            }
                            value={linkNotSentEmailLvl3}
                            inputStyle={{ padding: 0 }}
                            inputProps={{
                              style: inputPropsStyle,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography sx={casesyle}>
                          {"No response – link not used "}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoResponseLvl1(e.target.checked)
                              }
                              checked={noResponseLvl1}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                         error={!validationsCheck(noResponseEmailLvl1, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoResponseEmailLvl1(e.target.value)
                          }
                          value={noResponseEmailLvl1}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoResponseLvl2(e.target.checked)
                              }
                              checked={noResponseLvl2}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                         error={!validationsCheck(noResponseEmailLvl2, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoResponseEmailLvl2(e.target.value)
                          }
                          value={noResponseEmailLvl2}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoResponseLvl3(e.target.checked)
                              }
                              checked={noResponseLvl3}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                          error={!validationsCheck(noResponseEmailLvl3, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoResponseEmailLvl3(e.target.value)
                          }
                          value={noResponseEmailLvl3}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Typography sx={casesyle}>
                          {"Response but no submission"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoSubmissionLvl1(e.target.checked)
                              }
                              checked={noSubmissionLvl1}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                         error={!validationsCheck(noSubmissionEmailLvl1, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoSubmissionEmailLvl1(e.target.value)
                          }
                          value={noSubmissionEmailLvl1}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoSubmissionLvl2(e.target.checked)
                              }
                              checked={noSubmissionLvl2}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                          error={!validationsCheck(noSubmissionEmailLvl2, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoSubmissionEmailLvl2(e.target.value)
                          }
                          value={noSubmissionEmailLvl2}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              {...label}
                              onChange={(e) =>
                                setNoSubmissionLvl3(e.target.checked)
                              }
                              checked={noSubmissionLvl3}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                        <TextField
                           error={!validationsCheck(noSubmissionEmailLvl3, 'email')}
                          type="email"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={" "}
                          onChange={(e) =>
                            setNoSubmissionEmailLvl3(e.target.value)
                          }
                          value={noSubmissionEmailLvl3}
                          inputStyle={{ padding: 0 }}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </InputCard>
          </CardLayout>
        </Grid>
        <Grid item xs={12}>
          <CardLayout>
            <InputCard title="Criticality for Escalation">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={2.5}
                item
                xs={12}
                md={12}
                lg={12}
              >
                <Grid
                  sx={{ paddingLeft: "20px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                    md={12}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Typography
                          sx={lable2Style}
                        >{`No. of days to trigger Escalation at Level 1`}</Typography>
                        {escalationTriggerDaysCRTLvl1 !== undefined && (
                          <Select
                            error={false}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="customeTextField"
                            sx={inputFieldStyle}
                            onChange={(e) => {
                              setEscalationTriggerDaysCRTLvl1(e.target.value);
                            }}
                            value={escalationTriggerDaysCRTLvl1}
                          >
                            {new Array(8).fill(null).map((element, index) => {
                              const days = 7 + index;
                              return (
                                <MenuItem
                                  key={index}
                                  value={days}
                                >{`${days} days`}</MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Typography
                          sx={lable2Style}
                        >{`No. of days to trigger Escalation at Level 2`}</Typography>
                        {escalationTriggerDaysCRTLvl2 !== undefined && (
                          <Select
                            error={false}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="customeTextField"
                            sx={inputFieldStyle}
                            onChange={(e) => {
                              setEscalationTriggerDaysCRTLvl2(e.target.value);
                            }}
                            value={escalationTriggerDaysCRTLvl2}
                          >
                            {new Array(8).fill(null).map((element, index) => {
                              const days = 15 + index;
                              return (
                                <MenuItem
                                  key={index}
                                  value={days}
                                >{`${days} days`}</MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <Typography
                          sx={lable2Style}
                        >{`No. of days to trigger Escalation at Level 3`}</Typography>
                        {escalationTriggerDaysCRTLvl3 !== undefined && (
                          <Select
                            error={false}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="customeTextField"
                            sx={inputFieldStyle}
                            onChange={(e) => {
                              setEscalationTriggerDaysCRTLvl3(e.target.value);
                            }}
                            value={escalationTriggerDaysCRTLvl3}
                          >
                            {new Array(8).fill(null).map((element, index) => {
                              const days = 15 + index;
                              return (
                                <MenuItem
                                  key={index}
                                  value={days}
                                >
                                  {`${days} days`}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                    md={12}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12} md={3}>
                      <Typography sx={casesyle}>
                        {"Under process and DOJ 1 week left"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>No</Typography>
                          <Switch
                            {...label}
                            onChange={(e) => setDOJ1Lvl1(e.target.checked)}
                            checked={DOJ1Lvl1}
                            color="secondary"
                          />
                          <Typography>Yes</Typography>
                        </Stack>
                      </FormControl>
                      <TextField
                        error={!validationsCheck(DOJ1EmailLvl1, 'email')}
                        type="email"
                        className="customeTextField"
                        variant="outlined"
                        defaultValue={" "}
                        onChange={(e) => setDOJ1EmailLvl1(e.target.value)}
                        value={DOJ1EmailLvl1}
                        inputStyle={{ padding: 0 }}
                        inputProps={{
                          style: inputPropsStyle,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>No</Typography>
                          <Switch
                            {...label}
                            onChange={(e) => setDOJ1Lvl2(e.target.checked)}
                            checked={DOJ1Lvl2}
                            color="secondary"
                          />
                          <Typography>Yes</Typography>
                        </Stack>
                      </FormControl>
                      <TextField
                         error={!validationsCheck(DOJ1EmailLvl2, 'email')}
                        type="email"
                        className="customeTextField"
                        variant="outlined"
                        defaultValue={" "}
                        onChange={(e) => setDOJ1EmailLvl2(e.target.value)}
                        value={DOJ1EmailLvl2}
                        inputStyle={{ padding: 0 }}
                        inputProps={{
                          style: inputPropsStyle,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>No</Typography>
                          <Switch
                            {...label}
                            onChange={(e) => setDOJ1Lvl3(e.target.checked)}
                            checked={DOJ1Lvl3}
                            color="secondary"
                          />
                          <Typography>Yes</Typography>
                        </Stack>
                      </FormControl>
                      <TextField
                         error={!validationsCheck(DOJ1EmailLvl3, 'email')}
                        type="email"
                        className="customeTextField"
                        variant="outlined"
                        defaultValue={" "}
                        onChange={(e) => setDOJ1EmailLvl3(e.target.value)}
                        value={DOJ1EmailLvl3}
                        inputStyle={{ padding: 0 }}
                        inputProps={{
                          style: inputPropsStyle,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </InputCard>
          </CardLayout>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={2.5} item xs={12}>
          <Grid item xs={12}>
            <DetailesHeadingSection
              prop={{ step: "2", heading: "General Configuration" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CardLayout>
            <InputCard title="Critical Days">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                item
                xs={12}
                md={6}
                lg={12}
              >
                <Grid
                  sx={{ paddingLeft: "20px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                  >
                    <Grid container rowSpacing={1} item xs={12} md={12}>
                      <Grid item xs={12} md={4}>
                        <Typography sx={lable2Style}>No of Days</Typography>
                        <TextField
                          error={false}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                          type="text"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={""}
                          value={criticalDays}
                          inputStyle={{ padding: 0 }}
                          onChange={(e) => setCriticalDays(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography sx={lable2Style}>Grace period</Typography>
                        <TextField
                          error={false}
                          inputProps={{
                            style: inputPropsStyle,
                          }}
                          type="text"
                          className="customeTextField"
                          variant="outlined"
                          defaultValue={""}
                          value={gracePeriod}
                          inputStyle={{ padding: 0 }}
                          onChange={(e) => setGracePeriod(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} item xs={12} md={12}>
                      <Grid item xs={12} md={4}>

                        {hasPermission && hasPermission["A009"] && (
                          <Button
                            variant="contained"
                            onClick={handleClickOnSave}
                          >
                            Save
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </InputCard>
          </CardLayout>
        </Grid>
      </Grid>
    </Box>
  );
};

const GeneralSetupView = ActionPermission(UnwrappedGeneralSetupView);
export default GeneralSetupView;
