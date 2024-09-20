import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { WidgetCard } from '.';
import { useSelector } from 'react-redux';
import { toAttention } from 'shared/constants/constants';
import RectangularSkelton2 from 'shared/utils/skeltons/rectangular-skelton/rectangular-skelton2';
import { hasValue } from 'shared/utils';
import { criticalFabStyle, dashBoardwidget } from 'app';
import { ResponsiveFab } from 'app';

const CriticalRecruits = () => {

    const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
    const apiSlice = useSelector((state) => state.apiSlice);

    const { navigateTo } = commonHooksFunctionSlice[0];
    const { getTotalCriticalAppointee } = apiSlice[0];

    // chart color

    const theme = useTheme();
    const primary = theme.palette.secondary.main;
    const criticalColor = '#ca5180e3';
    const attention_light = theme.palette.error.main;
    const attention_dark = theme.palette.error.main;
    
    const [critical, setcritical] = useState(null);
    const optionscolumnchart = {
        chart: {
            type: 'donut',
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 155
        },
        labels: ["Under process", "Link not sent"],
        colors: [primary, criticalColor],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                donut: {
                    size: '75%',
                    background: 'transparent'
                },
            },

        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false
        },
        stroke: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120
                    }
                }
            }
        ]
    };


    const setTotalCriticalAppointee = async () => {
        const response = await getTotalCriticalAppointee();
        if (response) {
            setcritical(response.responseInfo);
        }
    }
    useEffect(() => {
        setTotalCriticalAppointee();
    }, []);


    const seriescolumnchart = [critical?.underProcessCriticalAppointee ?? 0, critical?.nonProcessCriticalAppointee ?? 0];
    return (
        <WidgetCard title="Attention"

            action={
                <ResponsiveFab onClick={() => navigateTo(toAttention)} 
                backgroundColor={attention_light}
                hoverColor={attention_dark} // Pass the desired hover color
               // size="small" 
                sx={{ ...dashBoardwidget }}>
                    <img src={"./playground_assets/redirect.svg"} alt="YourSVG" style={{ width: '80%', height: 'auto' }} />
                </ResponsiveFab>
            }
        >

            {/* const action = wizName ?
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
                <img src={"./playground_assets/redirect.svg"} alt="YourSVG" style={{ width: '80%', height: 'auto' }} />
            </ResponsiveFab> : <CircelSkelton1 /> */}
            <Grid container spacing={3}>

                <Grid item xs={7} sm={7} md={12}>
                    <Typography color="#cb634b" variant="h4" fontWeight="600" textAlign={"center"}>
                        {critical && critical.totalCriticalAppointee}
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={12}>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="donut"
                        height="140px"
                    />
                </Grid>
            </Grid>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
                {hasValue(critical && critical.totalCriticalAppointee) ?
                    <Typography variant="subtitle2" >
                        Appointees with Joining Date within  {critical.totalCriticalAppointee} days and yet to complete verification
                    </Typography> : <RectangularSkelton2 />}
            </Stack>
        </WidgetCard>
    );
};

export { CriticalRecruits };
