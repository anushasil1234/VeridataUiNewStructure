import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CardLayout, DateFormatYYYYMMDD, hasValue, PageLayout } from "shared/utils";
import { Box, Button, Card, Grid, List, ListItemButton } from "@mui/material";
import {
  primaryFabStyle,
  ResponsiveFab,
  datePickerstyle,
  downLoadListSx,
} from "app";
import { Download, Refresh, Search } from "@mui/icons-material";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import moment from "moment";
import CustomTab from "shared/utils/customTab/custom-tab";

const UnWrappedMannualVerification = (props) => {
  console.log("props", props);
  const { hasPermission } = props;

  const { state } = useLocation();
  console.log("state1111", state);
  const [isDownload, setIsDownload] = useState(false);
  const [isDownloadExcel, setIsDownloadExcel] = useState(false);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const {showErrorMessage} =popUpSlice[0]
  let _fromday;
  let _today;
  const now = new Date();
  _fromday = dayjs(new Date(now.setDate(now.getDate())));
  _today = dayjs(new Date());
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [payload, setPayload] = useState({});
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);
  var date = moment();
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    const reqPayload = {
      fromDate: null,
      toDate: null,
    };
    setPayload(reqPayload);
  };
  const handleExalListDownload = () => {
    setIsDownloadListOpened(!isDownloadListOpened);
  };
  const handleSearch = () => {
    const reqPayload = {
      fromDate: DateFormatYYYYMMDD(fromDate?.toString()),
      toDate: DateFormatYYYYMMDD(toDate?.toString()),
    };
    setPayload(reqPayload);
  };
  const tabs = {
    labelList: [
      "Manual Verification Required",
      "Manual Re-Verification Required",
      "Document Reupload Request",
    ],
    pannelList: ["MV", "MRV", "RD"],
    isDownloadTab: false,
  };
  console.log("datatabs", tabs);

  //   const handleDownloade = (rf) => {
  //     if (rf.fileData && typeof rf.fileData === 'string') {
  //       const base64String = rf.fileData;
  //       const fileName = rf.fileName || "appointee_data.xlsx";
  //       const blob = generateBlobFromBase64(base64String);
  //       const blobUrl = window.URL.createObjectURL(blob);
  //       downloadFile(blobUrl, fileName);
  //       window.URL.revokeObjectURL(blobUrl);
  //     }
  //   };
  //   const handleClick = async () => {
  //     const response = await GetUnderProcessReport(payLoad);
  //     if (response) {
  //       const { responseInfo } = response;
  //       handleDownloade(responseInfo);
  //     }
  //   };
  const handleClickToDwnldExcl = () => {
    setIsDownloadExcel(true);
  };
  const handleDownload = () => {
    setIsDownload(true);
  };
  useEffect(() => {
    if (isDownload) {
      handleDownload();
      setIsDownload(false);
    }
  }, [isDownload]);

  useEffect(() => {
    if (isDownloadExcel) {
      handleClickToDwnldExcl();
      setIsDownloadExcel(false);
    }
  }, [isDownloadExcel]);
  const handelsearch=()=>{
    if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage("From date can not be empty");
    }else {
      handleSearch();
    }
  }
  return (
    <PageLayout pageName={"Manual Verification"}>
      <CardLayout>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <Box sx={{ ...datePickerstyle }}>
              <DatePicker
                label={"From Date"}
                value={fromDate}
                maxDate={toDate}
                setValue={setFromDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <Box sx={{ ...datePickerstyle }}>
              <DatePicker
                label={"To Date"}
                value={toDate}
                minDate={fromDate}
                setValue={setToDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            container
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <DarkTooltip placement="top" title={"Search"} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={handelsearch}
                  sx={primaryFabStyle}
                >
                  <Search width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
            </Grid>
            <Grid item>
              <DarkTooltip placement="top" title={"Clear Search"} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={clearSearch}
                  sx={primaryFabStyle}
                >
                  <Refresh width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
            </Grid>
            {
               hasPermission && hasPermission["A008"] && (
              <Grid item sx={{ position: "relative" }}>
                <DarkTooltip placement="top" title={"Download Report"} arrow>
                  <ResponsiveFab
                    variant="contained"
                    size="small"
                    button={"N"}
                    onClick={handleExalListDownload}
                    sx={primaryFabStyle}
                  >
                    <Download width={18} sx={{ color: "#fff" }} />
                  </ResponsiveFab>
                </DarkTooltip>
                {isDownloadListOpened && (
                  <List
                    sx={{
                      ...downLoadListSx,
                      zIndex: 1000,
                    }}
                  >
                    <ListItemButton component="a">
                      <DarkTooltip
                        placement="top"
                        title={"Download PDF Report"}
                        arrow
                      >
                        {/* <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          sx={primaryFabStyle}
                          onClick={handleDownload}
                        >
                          <Summarize width={18} sx={{ color: "#fff" }} />
                        </ResponsiveFab> */}
                        <Button variant="contained" onClick={handleDownload}>
                          PDF
                        </Button>
                      </DarkTooltip>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <DarkTooltip
                        placement="top"
                        title={"Download XLSX Report"}
                        arrow
                      >
                        {/* <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          sx={primaryFabStyle}
                        >
                          <ArticleIcon width={18} sx={{ color: "#fff" }} />
                        </ResponsiveFab> */}
                        <Button variant="contained" onClick={handleClickToDwnldExcl}>
                          XLSX
                        </Button>
                      </DarkTooltip>
                    </ListItemButton>
                  </List>
                )}
              </Grid>
              )}

          </Grid>
        </Grid>
        <Card sx={{ border: 1, borderColor: "divider", marginTop: "23px" }}>
          <CustomTab tabs={tabs} payload={payload} isDownload={isDownload} isDownloadExcel={isDownloadExcel} hasPermission ={hasPermission} />
        </Card>
      </CardLayout>
    </PageLayout>
  );
};
const MannualVerification = ActionPermission(UnWrappedMannualVerification);
export default MannualVerification;
