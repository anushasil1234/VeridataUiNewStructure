import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MVTable } from "../mannual-verification-tabs/mv-table";
import dayjs from "dayjs";
import { CardLayout } from "..";
import { useTheme } from "@mui/material";
import { tableHeader } from "app";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTab(props) {
  const theme = useTheme();
  let noOfDays = 0;
  let _fromday;
  let _today;
  // const [tabValue, setTabValue] = React.useState(0);

  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }
  const { tabs, payload ,isDownload,setIsDownloadExcel,setIsDownload, isDownloadExcel, hasPermission} = props;
  const { labelList, pannelList ,filterTab} = tabs;

  const initialTabIndex = pannelList.indexOf(filterTab); // Find the index of the `filterTab`
  const [tabValue, setTabValue] = React.useState(initialTabIndex >= 0 ? initialTabIndex : 0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor={theme.palette.text.primary}
          value={tabValue}
          onChange={handleTabChange}
          aria-label="secondary tabs example"
        >
          {labelList &&
            labelList.map((label, index) => {
              return (
                <Tab
                  style={{ width: "30%", height: "max-content" }}
                  label={label}
                  {...a11yProps(index)}
                  sx={{
                    // "&.MuiTabs-indicator": {
                    //   backgroundColor: `${theme.palette.primary.dark} !important`,
                    //   // height: 3,
                    // },
                    "&.MuiTab-root:hover": {
                      color: theme.palette.primary.dark,
                      // backgroundColor: theme.palette.primary.light,
                      // opacity: 0.
                    },
                    "&.Mui-selected": {
                      color: theme.palette.primary.dark,
                      // backgroundColor: theme.palette.primary.light,
                    },
                    // fontWeight: 550,
                    // fontSize: "0.875rem",
                    ...tableHeader,
                  }}
                  TabIndicatorProps={{
                    sx: {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                />
              );
            })}
        </Tabs>
      </Box>
      {pannelList &&
        pannelList.map((pannel, index) => {
          return (
            <CustomTabPanel value={tabValue} index={index}>
              <MVTable props={pannel} payload={payload} isDownload ={isDownload} setIsDownload={setIsDownload} isDownloadExcel = {isDownloadExcel} setIsDownloadExcel={setIsDownloadExcel} hasPermission = {hasPermission} />
            {/* {console.log('aaaa')} */}
            </CustomTabPanel>
          );
        })}
    </Box>
  );
}
