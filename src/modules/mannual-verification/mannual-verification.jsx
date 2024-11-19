import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CardLayout, DateFormatYYYYMMDD, PageLayout } from "shared/utils";
import { Box, Button, Card, Grid, List, ListItemButton } from "@mui/material";
import { primaryFabStyle, ResponsiveFab, datePickerstyle, downLoadListSx } from "app";
import { Download, Refresh, Search } from "@mui/icons-material";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import moment from "moment";
import CustomTab from "shared/utils/customTab/custom-tab";

const UnWrappedMannualVerification = (props) => {
  console.log("props", props);
  const { state } = useLocation();
  console.log("state1111", state);

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
      "Document Reupload Request",
      "Manual Re-Verification Required",
    ],
    pannelList: ["MV", "RD", "MRV"],
  };
  console.log("datatabs", tabs);
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
                  onClick={handleSearch}
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
            //hasPermission && hasPermission["A008"] && (
            //   <Grid item sx={{ position: 'relative' }}>
            //     <DarkTooltip placement="top" title={"Download Report"} arrow>
            //       <ResponsiveFab
            //         variant="contained"
            //         size="small"
            //         button={"N"}
            //         //onClick={handleExalListDownload}
            //         sx={primaryFabStyle}
            //       >
            //         <Download width={18} sx={{ color: "#fff" }} />
            //       </ResponsiveFab>
            //     </DarkTooltip>
            //     {
            //     isDownloadListOpened && 
            //     (
            //       <List
            //         sx={{
            //           ...downLoadListSx,
            //           zIndex: 1000,
            //         }}
            //       >
            //         <ListItemButton component="a" >
            //           <DarkTooltip placement="top" title={"Download PDF Report"} arrow>
            //             {/* <ResponsiveFab
            //               variant="contained"
            //               size="small"
            //               button={"N"}
            //               sx={primaryFabStyle}
            //               onClick={handleDownload}
            //             >
            //               <Summarize width={18} sx={{ color: "#fff" }} />
            //             </ResponsiveFab> */}
            //             <Button variant="contained" 
            //            // onClick={handleDownload}
            //             >PDF</Button>
            //           </DarkTooltip>
            //         </ListItemButton>
            //         <ListItemButton component="a">
            //           <DarkTooltip placement="top" title={"Download XLSX Report"} arrow>
            //             {/* <ResponsiveFab
            //               variant="contained"
            //               size="small"
            //               button={"N"}
            //               sx={primaryFabStyle}
            //             >
            //               <ArticleIcon width={18} sx={{ color: "#fff" }} />
            //             </ResponsiveFab> */}
            //             <Button variant="contained" 
            //             // onClick={handleClick}
            //             >XLSX</Button>
            //           </DarkTooltip>
            //         </ListItemButton>
            //       </List>
            //     )}
            //   </Grid>
           // )}
            }
          </Grid>
        </Grid>
        <Card sx={{ border: 1, borderColor: "divider", marginTop: "23px" }}>
          <CustomTab tabs={tabs} payload={payload} />
        </Card>
      </CardLayout>
    </PageLayout>
  );
};
const MannualVerification = ActionPermission(UnWrappedMannualVerification);
export default MannualVerification;
