import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Fab } from '@mui/material';
import WidgetCard from './widget-card';

const CardStructure = ({ fitToContaner, navigateToUnderProcess }) => {
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondarylight = '#f5fcff';
    const underProcessColor = '#bdaf4ae3';
    const underProcessFabStyle = {
        bgcolor: theme.palette.yellow1.light,
        color: theme.palette.common.white,
        "&:hover": {
            bgcolor: theme.palette.yellow1.main
        }
    }
    const chartdata = 
        [0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0];

    const optionscolumnchart = {
        chart: {
            type: 'area',
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
    };
    const seriescolumnchart = [
        {
            name: '',
            color: secondary,
            data: chartdata,
        },
    ];


    const dashBoardwidget = {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1
    }
    return (
        <WidgetCard
            title="No Response"
            action={
                <Fab onClick={navigateToUnderProcess} size="small" sx={{ ...underProcessFabStyle, ...dashBoardwidget }}>
                    <img src={"./playground_assets/redirect.svg"} alt="YourSVG"/>

                </Fab>
            }
            footer={
                < Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="40px" />
            } fitToContaner={fitToContaner}
        >
            <>
                <Typography color={underProcessColor} variant="h4" fontWeight="600" mt="-20px">
                    9
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                
                    <Typography variant="subtitle2" fontWeight="530">
                        Verification link sent but not used
                    </Typography>
                   
                </Stack>
            </>
        </WidgetCard >
    );
};

export default CardStructure;
