import React, { useEffect, useState } from "react";
import { Typography, Box, Select, MenuItem, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { DataTable, generateTableRowData } from "shared/utils";
import { WidgetCard } from ".";
import { useSelector } from "react-redux";
import { latestAppointeeListTableHeadCell } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";

const UnwrappedUpcomingRecruits = ({ fitToContaner, hasPermission }) => {
  const [recruits, setRecruits] = useState([]);
  const [type, setType] = useState();
  const [urltype, setUrltType] = useState("");
  const [error, setError] = useState(null); 

  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);

  const navigate = useNavigate(); 

 
  const { getLatestAppointees } = apiSlice[0] || {};

 
  const upcomingRecruitsStatusList =
    dropdownList && dropdownList.length > 0 && dropdownList[0].upcomingRecruitsStatusList
      ? dropdownList[0].upcomingRecruitsStatusList
      : [];

  
  const setLatestAppointeeData = async (type) => {
    try {   
      const response = await getLatestAppointees(type);
      if (response && response.responseInfos) {
        const { responseInfos } = response;
        const generatedCells = generateTableRowData(
          responseInfos,
          latestAppointeeListTableHeadCell,
          null,
          hasPermission
        );
        setRecruits({
          tableHead: latestAppointeeListTableHeadCell,
          tableRows: generatedCells,
        });
      } else {
        
        setRecruits({ tableHead: latestAppointeeListTableHeadCell, tableRows: [] });
      }
    } catch (err) {
      
      setError("Failed to load latest appointees.");
    }
  };


  const handleStatusChange = (event) => {
    const { value } = event.target;
    setUrltType(value);
    const currentStatus = upcomingRecruitsStatusList.find(
      ({ route }) => route === value
    );

    if (currentStatus) {
      setType(currentStatus.type);
    } else {
      
      setType(undefined);
    }
  };


  useEffect(() => {
    if (hasPermission && type) {
      setLatestAppointeeData(type);
    }
  }, [type, hasPermission]);

 
  useEffect(() => {
    if (upcomingRecruitsStatusList.length > 1) {
      const { type, route } = upcomingRecruitsStatusList[1];    
      setType(type);
      setUrltType(route);
    } else if (upcomingRecruitsStatusList.length > 0) {     
      const { type, route } = upcomingRecruitsStatusList[0];      
      setType(type);
      setUrltType(route);
    } else {
      console.warn("upcomingRecruitsStatusList is empty or undefined.");
    }
  }, [upcomingRecruitsStatusList]);

  
  const handleShowMoreRows = () => {
    if (urltype) {
      navigate(urltype);
    } else {
      console.warn("urltype is not defined.");
    }
  };

  return (
    <WidgetCard
      title="Status Report"
      action={
        <Stack flexDirection={"row"} alignItems={"center"}>
          <Typography
            sx={{
              mr: { xs: "5px", sm: "8px" },
              mb: { xs: 1, sm: 0 },
            }}
          >
            Select
          </Typography>
          {urltype !== undefined && (
            <Select
              labelId="status"
              id="status"
              value={urltype}
              size="small"
              onChange={handleStatusChange}
            >
              {upcomingRecruitsStatusList.map(({ label, route }, index) => (
                <MenuItem key={index} value={route}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          )}
        </Stack>
      }
      fitToContaner={fitToContaner}
    >
      <Box sx={{ overflow: "auto" }}>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <DataTable
          rows={recruits}
          setRows={setRecruits}
          headCells={latestAppointeeListTableHeadCell}
          isPaginationOn={false}
          isShowMoreRowsOn={false}
        />
       
        <Button
          variant="text"
          color="primary"
          onClick={handleShowMoreRows}
          sx={{ marginTop: 2 }}
        >
          Show more rows
        </Button>
        {/* Alternatively, use Box with improved styling and logging */}
        
        {/* <Box
          sx={{
            ...sampleDownLoadLinkContainerStyle,
            marginTop: 2,
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
          }}
          onClick={handleShowMoreRows}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleShowMoreRows();
          }}
          aria-label="Show more rows"
        >
          Show more rows
        </Box> */}
       
      </Box>
    </WidgetCard>
  );
};

const UpcomingRecruits = ActionPermission(UnwrappedUpcomingRecruits);

export { UpcomingRecruits };
