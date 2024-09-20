// import React from 'react';
// import Chart from 'react-apexcharts';
// import { useTheme } from '@mui/material/styles';
// import { Stack, Typography, Fab } from '@mui/material';
// import { WidgetCard } from '.';
// import { toProcessing } from 'shared/constants/constants';
// import { useSelector } from 'react-redux';
// import RectangleSkelton1 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton1';
// import CircelSkelton1 from 'shared/utils/skeltons/circel-skelton/circel-skelton1';
// import RectangularSkelton2 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton2';


// const UnderProcess = ({ fitToContaner, wizdata, dayRangePayLoad }) => {
//     // chart color
//     const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

//     const { navigateTo } = commonHooksFunctionSlice[0];
//     const theme = useTheme();
//     const secondary = theme.palette.secondary.main;
//     const secondarylight = '#f5fcff';
//     const underProcessColor = '#bdaf4ae3';
//     const underProcessFabStyle = {
//         bgcolor: theme.palette.yellow1.light,
//         color: theme.palette.common.white,
//         "&:hover": {
//             bgcolor: theme.palette.yellow1.main

//         }
//     }

//     const chartdata = wizdata?.widgetChartValue;
//     const wizName = wizdata?.widgetTypeName ?? <RectangleSkelton1 />;
//     const wizValue = wizdata?.widgetTypeValue ?? <RectangleSkelton1 />;
//     // chart
//     const optionscolumnchart = {
//         chart: {
//             type: 'area',
//             foreColor: '#adb0bb',
//             toolbar: {
//                 show: false
//             },
//             height: 60,
//             sparkline: {
//                 enabled: true
//             },
//             group: 'sparklines'
//         },
//         stroke: {
//             curve: 'smooth',
//             width: 2
//         },
//         fill: {
//             colors: [secondarylight],
//             type: 'solid',
//             opacity: 0.05
//         },
//         markers: {
//             size: 0
//         },
//         tooltip: {
//             theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
//         }
//     };
//     const seriescolumnchart = [
//         {
//             name: '',
//             color: secondary,
//             data: chartdata
//         }
//     ];

//     const dashBoardwidget = {
//         position: "absolute",
//         top: 0,
//         right: 0,
//         zIndex: 1
//     }
//     const action = wizName ?
//         <Fab onClick={() => navigateTo(toProcessing, { state: { dayRangePayLoad, filterType: "UNDPRCS" } })} size="small" sx={{ ...underProcessFabStyle, ...dashBoardwidget }}>
//             <img src={"./playground_assets/redirect.svg"} alt="YourSVG" />
//         </Fab> : <CircelSkelton1 />
//     return (
//         <WidgetCard
//             title={wizName}
//             action={action}
//             footer={
//                 < Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="40px" />
//             }
//             fitToContaner={fitToContaner}
//         >
//             <>
//                 <Typography color={underProcessColor} variant="h4" fontWeight="600" mt="-20px">
//                     {wizValue}
//                 </Typography>
//                 <Stack direction="row" spacing={1} my={1} alignItems="center">
//                     {wizName ?
//                         <Typography variant="subtitle2" fontWeight="530">
//                             Verification link used but verification process incomplete
//                         </Typography> : <RectangularSkelton2 />}

//                 </Stack>
//             </>
//         </WidgetCard >
//     );
// };

// export { UnderProcess };

// import React from 'react';
// import Chart from 'react-apexcharts';
// import { useTheme } from '@mui/material/styles';
// import { Stack, Typography, Fab } from '@mui/material';
// import { WidgetCard } from '.';
// import { toProcessing } from 'shared/constants/constants';
// import { useSelector } from 'react-redux';
// import RectangleSkelton1 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton1';
// import CircelSkelton1 from 'shared/utils/skeltons/circel-skelton/circel-skelton1';
// import RectangularSkelton2 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton2';
// // import {getUnderProcessFabStyle} from 'app'

// const UnderProcess = ({ fitToContaner, wizdata, dayRangePayLoad }) => {
//     // chart color
//     const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

//     const { navigateTo } = commonHooksFunctionSlice[0];
//     const theme = useTheme();
//     const secondary = theme.palette.secondary.main;
//     const secondarylight = '#f5fcff';
//     const underProcessColor = '#bdaf4ae3';
//     const underProcessFabStyle = {
//         bgcolor: theme.palette.yellow1.light,
//         color: theme.palette.common.white,
//         width: '31px',
//         height: '31px',
//         minHeight: '31px',
//         padding: '7px',
//         borderRadius: '50%',
//         "& .MuiFab-label": {
//             fontSize: '0.9rem'
//         },
//         "&:hover": {
//             bgcolor: theme.palette.yellow1.main
//         },
//     };

//     const chartdata = wizdata?.widgetChartValue;
//     const wizName = wizdata?.widgetTypeName ?? <RectangleSkelton1 />;
//     const wizValue = wizdata?.widgetTypeValue ?? <RectangleSkelton1 />;
//     // chart
//     const optionscolumnchart = {
//         chart: {
//             type: 'area',
//             foreColor: '#adb0bb',
//             toolbar: {
//                 show: false
//             },
//             height: 60,
//             sparkline: {
//                 enabled: true
//             },
//             group: 'sparklines'
//         },
//         stroke: {
//             curve: 'smooth',
//             width: 2
//         },
//         fill: {
//             colors: [secondarylight],
//             type: 'solid',
//             opacity: 0.05
//         },
//         markers: {
//             size: 0
//         },
//         tooltip: {
//             theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
//         }
//     };
//     const seriescolumnchart = [
//         {
//             name: '',
//             color: secondary,
//             data: chartdata
//         }
//     ];

//     const dashBoardwidget = {
//         position: "absolute",
//         top: 0,
//         right: 0,
//         zIndex: 1
//     }
//     const action = wizName ?
//         <Fab onClick={() => navigateTo(toProcessing, { state: { dayRangePayLoad, filterType: "UNDPRCS" } })}
//            size="small"
//             sx={{ ...underProcessFabStyle, ...dashBoardwidget }}>
//             <img src={"./playground_assets/redirect.svg"} alt="YourSVG" />
//         </Fab> : <CircelSkelton1 />
//     return (
//         <WidgetCard
//             title={wizName}
//             action={action}
//             footer={
//                 < Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="40px" />
//             }
//             fitToContaner={fitToContaner}
//         >
//             <>
//                 <Typography color={underProcessColor} variant="h4" fontWeight="600" mt="-20px">
//                     {wizValue}
//                 </Typography>
//                 <Stack direction="row" spacing={1} my={1} alignItems="center">
//                     {wizName ?
//                         <Typography variant="subtitle2" fontWeight="530">
//                             Verification link used but verification process incomplete
//                         </Typography> : <RectangularSkelton2 />}

//                 </Stack>
//             </>
//         </WidgetCard >
//     );
// };

// export { UnderProcess };

import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import {useMediaQuery } from '@mui/material';
import { Stack, Typography, Fab } from '@mui/material';
import { WidgetCard } from '.';
import { toProcessing } from 'shared/constants/constants';
import { useSelector } from 'react-redux';
import RectangleSkelton1 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton1';
import CircelSkelton1 from 'shared/utils/skeltons/circel-skelton/circel-skelton1';
import RectangularSkelton2 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton2';
// import {getUnderProcessFabStyle} from 'app'
import { ResponsiveFab } from 'app';
const UnderProcess = ({ fitToContaner, wizdata, dayRangePayLoad }) => {
    const theme = useTheme();
    const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
    const { navigateTo } = commonHooksFunctionSlice[0];

    const chartdata = wizdata?.widgetChartValue;
    const wizName = wizdata?.widgetTypeName ?? <RectangleSkelton1 />;
    const wizValue = wizdata?.widgetTypeValue ?? <RectangleSkelton1 />;

    // Chart options
    const optionscolumnchart = {
        chart: {
            type: 'area',
            foreColor: '#adb0bb',
            toolbar: {
                show: false
            },
            height: 60,
            sparkline: {
                enabled: true
            },
            group: 'sparklines'
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            colors: ['#f5fcff'],
            type: 'solid',
            opacity: 0.05
        },
        markers: {
            size: 0
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
        }
    };

    const seriescolumnchart = [
        {
            name: '',
            color: theme.palette.secondary.main,
            data: chartdata
        }
    ];

    const dashBoardwidget = {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1
    };

    const action = wizName ? (
        <ResponsiveFab
            onClick={() => navigateTo(toProcessing, { state: { dayRangePayLoad, filterType: "UNDPRCS" } })}
            //size="small"
            sx={dashBoardwidget}
        >
            <img src={"./playground_assets/redirect.svg"} alt="YourSVG" style={{ width: '70%', height: 'auto' }}/>
        </ResponsiveFab>
    ) : <CircelSkelton1 />;

    return (
        <WidgetCard
            title={wizName}
            action={action}
            footer={
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="40px" />
            }
            fitToContaner={fitToContaner}
        >
            <>
                <Typography color="#bdaf4ae3" variant="h4" fontWeight="600" mt="-20px">
                    {wizValue}
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                    {wizName ? (
                        <Typography variant="subtitle2" fontWeight="530">
                            Verification link used but verification process incomplete
                        </Typography>
                    ) : <RectangularSkelton2 />}
                </Stack>
            </>
        </WidgetCard>
    );
};

export { UnderProcess };