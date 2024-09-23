// import React from "react";
// import { Typography, Box, Select, MenuItem, Stack } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { DataTable, generateTableRowData } from "shared/utils";
// import { WidgetCard } from ".";
// import { useSelector } from "react-redux";
// import { latestAppointeeListTableHeadCell } from "shared/constants/constants";
// import { sampleDownLoadLinkContainerStyle } from "app";
// import ActionPermission from "shared/components/action-permission/action-permission";

// const UnwrappedUpcomingRecruits = ({ fitToContaner, hasPermission }) => {
//   const [recruits, setrecruits] = useState([]);

//   const dropdownList = useSelector(state => state.dropdownList);
//   const apiSlice  = useSelector(state => state.apiSlice);

//   const { getLatestAppointees } = apiSlice[0];

//   const { upcomingRecruitsStatusList } =
//     dropdownList && dropdownList.length > 0 && dropdownList[0];

//   const setLatestAppointeeData = async (type) => {
//     const response = await getLatestAppointees(type);
//     if (response) {
//       const { responseInfos } = response;

//       let generatedCells = generateTableRowData(
//         responseInfos,
//         latestAppointeeListTableHeadCell,
//         null,
//         hasPermission
//       );
//       setrecruits({
//         tableHead: latestAppointeeListTableHeadCell,
//         tableRows: generatedCells
//       });
//     }
//   };

//   const [type, setType] = React.useState();
//   const [urltype, setUrltType] = React.useState("");

//   const handleStatusChange = (event) => {
//     const { value } = event.target;
//     setUrltType(value);
//     const currentStatus = upcomingRecruitsStatusList.find(
//       ({ route }) => route === value
//     );
//     setType(currentStatus.type);
//   };
//   useEffect(() => {

//     hasPermission && setLatestAppointeeData(type);
//   }, [type]);
//   useEffect(() => {
//     if (upcomingRecruitsStatusList) {
//       const { type, route } = upcomingRecruitsStatusList[1];
//       setType(type);
//       setUrltType(route);
//     }
//   }, [upcomingRecruitsStatusList]);
//   return (
//     <WidgetCard
//       title="Status Report"
//       action={
//         <Stack flexDirection={"row"} alignItems={"center"}>
//           <Typography sx={{ mr: "10px" }}>Select</Typography>
//           {urltype !== undefined && (
//             <Select
//               labelId="status"
//               id="status"
//               value={urltype}
//               size="small"
//               onChange={handleStatusChange}
//             >
//               {upcomingRecruitsStatusList &&
//                 upcomingRecruitsStatusList.map(({ label, route, type }, index) => {
//                   return <MenuItem key={index} value={route}>{label}</MenuItem>;
//                 })}
//             </Select>
//           )}
//         </Stack>
//       }
//       fitToContaner={fitToContaner}
//     >
//       <Box sx={{ overflow: "auto" }}>
//         <DataTable
//           rows={recruits}
//           setRows={setrecruits}
//           headCells={latestAppointeeListTableHeadCell}
//           isPaginationOn={false}
//           isShowMoreRowsOn={false}
//         />
//         <Box sx={{ ...sampleDownLoadLinkContainerStyle, marginTop: 2 }}>
//           <Link to={urltype}>Show more rows</Link>
//         </Box>
//       </Box>
//     </WidgetCard>
//   );
// };
// const UpcomingRecruits = ActionPermission(UnwrappedUpcomingRecruits);

// export { UpcomingRecruits };


import React from "react";
import { Typography, Box, Select, MenuItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataTable, generateTableRowData } from "shared/utils";
import { WidgetCard } from ".";
import { useSelector } from "react-redux";
import { latestAppointeeListTableHeadCell } from "shared/constants/constants";
import { sampleDownLoadLinkContainerStyle } from "app";
import ActionPermission from "shared/components/action-permission/action-permission";

const UnwrappedUpcomingRecruits = ({ fitToContaner, hasPermission }) => {
  const [recruits, setrecruits] = useState([]);

  const dropdownList = useSelector(state => state.dropdownList);
  const apiSlice = useSelector(state => state.apiSlice);

  const { getLatestAppointees } = apiSlice[0];

  const { upcomingRecruitsStatusList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];

  const setLatestAppointeeData = async (type) => {
    const response = await getLatestAppointees(type);
    if (response) {
      const { responseInfos } = response;

      let generatedCells = generateTableRowData(
        responseInfos,
        latestAppointeeListTableHeadCell,
        null,
        hasPermission
      );
      setrecruits({
        tableHead: latestAppointeeListTableHeadCell,
        tableRows: generatedCells
      });
    }
  };

  const [type, setType] = React.useState();
  const [urltype, setUrltType] = React.useState("");

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setUrltType(value);
    const currentStatus = upcomingRecruitsStatusList.find(
      ({ route }) => route === value
    );
    setType(currentStatus.type);
  };
  useEffect(() => {

    hasPermission && setLatestAppointeeData(type);
  }, [type]);
  useEffect(() => {
    if (upcomingRecruitsStatusList) {
      const { type, route } = upcomingRecruitsStatusList[1];
      setType(type);
      setUrltType(route);
    }
  }, [upcomingRecruitsStatusList]);
  return (
    <WidgetCard
      title="Status Report"
      action={
        <Stack flexDirection={"row"} alignItems={"center"} >
          <Typography sx={{ mr: { xs: "5px", sm: "8px" }, mb: { xs: 1, sm: 0 } }}>
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
              {upcomingRecruitsStatusList &&
                upcomingRecruitsStatusList.map(({ label, route }, index) => {
                  return <MenuItem key={index} value={route}>{label}</MenuItem>;
                })}
            </Select>
          )}
        </Stack>

      }
      fitToContaner={fitToContaner}
    >
      <Box >
        <DataTable
          rows={recruits}
          setRows={setrecruits}
          headCells={latestAppointeeListTableHeadCell}
          isPaginationOn={false}
          isShowMoreRowsOn={false}
        />
        <Box sx={{ ...sampleDownLoadLinkContainerStyle, marginTop: 2 }}>
          <Link to={urltype}>Show more rows</Link>
        </Box>
      </Box>
    </WidgetCard>
  );
};
const UpcomingRecruits = ActionPermission(UnwrappedUpcomingRecruits);

export { UpcomingRecruits };
