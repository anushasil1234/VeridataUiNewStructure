// import React from "react";
// import Chart from "react-apexcharts";
// import { useTheme } from "@mui/material/styles";
// import { Stack, Typography, Fab } from "@mui/material";
// import { WidgetCard } from ".";
// import { toLinknotsent } from "shared/constants/constants";
// import { useSelector } from "react-redux";
// import RectangleSkelton1 from "shared/utils/skeltons/rectangular-skelton/rectangular-skelton1";
// import RectangularSkelton2 from "shared/utils/skeltons/rectangular-skelton/rectangular-skelton2";
// import CircelSkelton1 from "shared/utils/skeltons/circel-skelton/circel-skelton1";

// const LinkNotSent = ({ fitToContaner, wizdata, dayRangePayLoad }) => {
//   const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
  
//   const { navigateTo } = commonHooksFunctionSlice[0];
//   // chart color
//   const theme = useTheme();
//   const secondary = theme.palette.secondary.main;
//   const secondarylight = "#f5fcff";
//   const chartdata = wizdata?.widgetChartValue;
//   const wizName = wizdata?.widgetTypeName ?? <RectangleSkelton1 />;
//   const wizValue = wizdata?.widgetTypeValue ?? <RectangleSkelton1 />;
//   const dashBoardwidget = {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     zIndex: 1,
//   }; // chart
//   const optionscolumnchart = {
//     chart: {
//       type: "area",
//       foreColor: "#adb0bb",
//       toolbar: {
//         show: false
//       },
//       height: 60,
//       sparkline: {
//         enabled: true
//       },
//       group: "sparklines",
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2
//     },
//     fill: {
//       colors: [secondarylight],
//       type: "solid",
//       opacity: 0.05
//     },
//     markers: {
//       size: 0
//     },
//     tooltip: {
//       theme: theme.palette.mode === "dark" ? "dark" : "light"
//     },
//   };
//   const seriescolumnchart = [
//     {
//       name: "",
//       color: secondary,
//       data: chartdata
//     }
//   ];

//   const action = wizName ?
//     <Fab
//       onClick={() =>
//         navigateTo(toLinknotsent, { state: { dayRangePayLoad } })
//       }
//       color="secondary"
//       size="small"
//       sx={{ ...dashBoardwidget }}
//     >
//       <img src={"./playground_assets/redirect.svg"} alt="YourSVG" />
//     </Fab> : <CircelSkelton1 />
//   return (
//     <WidgetCard
//       title={wizName}
//       action={action}
//       footer={
//         <Chart
//           options={optionscolumnchart}
//           series={seriescolumnchart}
//           type="area"
//           height="40px"
//         />
//       }
//       fitToContaner={fitToContaner}
//     >
//       <>
//         <Typography color={secondary} variant="h4" fontWeight="600" mt="-20px">
//           {wizValue}
//         </Typography>
//         <Stack direction="row" spacing={1} my={1} alignItems="center">
//           {wizName ?
//             <Typography variant="subtitle2" fontWeight="530">
//               Verification link not sent
//             </Typography> : <RectangularSkelton2 />}
//         </Stack>
//       </>
//     </WidgetCard>
//   );
// };

// export { LinkNotSent };

import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Fab } from "@mui/material";
import { WidgetCard } from ".";
import { toLinknotsent } from "shared/constants/constants";
import { useSelector } from "react-redux";
import RectangleSkelton1 from "shared/utils/skeltons/rectangular-skelton/rectangular-skelton1";
import RectangularSkelton2 from "shared/utils/skeltons/rectangular-skelton/rectangular-skelton2";
import CircelSkelton1 from "shared/utils/skeltons/circel-skelton/circel-skelton1";
import { ResponsiveFab } from 'app';

const LinkNotSent = ({ fitToContaner, wizdata, dayRangePayLoad }) => {
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
  
  const { navigateTo } = commonHooksFunctionSlice[0];
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const linknotsentColour = theme.palette.secondary.light
  const secondarylight = "#f5fcff";
  const chartdata = wizdata?.widgetChartValue;
  const wizName = wizdata?.widgetTypeName ?? <RectangleSkelton1 />;
  const wizValue = wizdata?.widgetTypeValue ?? <RectangleSkelton1 />;
  const dashBoardwidget = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  }; // chart
  const optionscolumnchart = {
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false
      },
      height: 60,
      sparkline: {
        enabled: true
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05
    },
    markers: {
      size: 0
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light"
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      color: secondary,
      data: chartdata
    }
  ];

  const action = wizName ?
    <ResponsiveFab
      onClick={() =>
        navigateTo(toLinknotsent, { state: { dayRangePayLoad } })
      }
      backgroundColor={linknotsentColour}
      hoverColor={secondary} // Pass the desired hover color
      //color="secondary"
      //size="small"
      sx={{ ...dashBoardwidget }}
    >
      <img src={"./playground_assets/redirect.svg"} alt="YourSVG"   style={{ width: '70%', height: 'auto' }}/> 
    </ResponsiveFab> : <CircelSkelton1 />
  return (
    <WidgetCard
      title={wizName}
      action={action}
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="40px"
        />
      }
      fitToContaner={fitToContaner}
    >
      <>
        <Typography color={secondary} variant="h4" fontWeight="600" mt="-20px">
          {wizValue}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          {wizName ?
            <Typography variant="subtitle2" fontWeight="530">
              Verification link not sent
            </Typography> : <RectangularSkelton2 />}
        </Stack>
      </>
    </WidgetCard>
  );
};

export { LinkNotSent };
