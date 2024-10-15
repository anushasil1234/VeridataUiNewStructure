
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Grid, useMediaQuery, Card, CardContent, Box } from '@mui/material';
import { WidgetCard } from '.';
import { useSelector } from 'react-redux';
import { statusChartColorList } from 'app';
import { Tooltip, Typography } from '@mui/material';

const CumulativeStatus = () => {
    const apiSlice = useSelector((state) => state.apiSlice);
    const { getTotalWidgetData } = apiSlice[0];
    const title = "Status"; // Define the title

    const [seriescolumnchart, setSeriescolumnchart] = useState([]);

    // Media queries for responsiveness
    const isXs = useMediaQuery('(max-width:600px)');
    const isSm = useMediaQuery('(min-width:600px) and (max-width:960px)');
    const isMd = useMediaQuery('(min-width:960px) and (max-width:1280px)');
    const isLg = useMediaQuery('(min-width:1280px) and (max-width:1920px)');
    const isXl = useMediaQuery('(min-width:1920px)');

    const setTotalDataWidgetTostate = async () => {
        const response = await getTotalWidgetData();
        if (response) {
            const { totalProcess, totalReject, totalUnderProcess, totalNonProcess } = response.responseInfo;
            setSeriescolumnchart([totalProcess, totalNonProcess, totalUnderProcess, totalReject]);
        }
    }

    useEffect(() => {
        setTotalDataWidgetTostate();
    }, []);

    // Dynamically set chart size based on screen size
    const getChartSize = () => {
        if (isXs) return 200;
        if (isSm) return 250;
        if (isMd) return 300;
        if (isLg) return 300;
        if (isXl) return 400;
        return 300; // Default size
    };

    // Chart options
    const optionscolumnchart = {
        chart: {
            type: 'pie',
            toolbar: {
                show: false,
            }
        },
        labels: ["Verified", "Link not sent", "Under process", "Cancelled"],
        colors: statusChartColorList,
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent'
                }
            }
        },
        tooltip: {
            fillSeriesColor: true
        },
        stroke: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: true,
            position: 'right', // Position the legends at the bottom
            horizontalAlign: 'center', // Align the legends horizontally in the center
            fontSize: '14px', // Make sure text size is appropriate
            itemMargin: {
                horizontal: 0,
                vertical: 0 // Adjust vertical margin to fit better
            }
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: getChartSize(), // Dynamically adjust chart size based on breakpoints
                    }
                }
            }
        ]
    };

    return (
        <Card
            sx={{
                padding: 0,
                height: 'fit-content',
                position: 'relative',
                minHeight: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}
            elevation={5}
            variant={undefined}
        >
            <CardContent sx={{ position: 'relative' }}>
                <Grid container spacing={2}  >
                    <Box sx={{ minWidth: 0, mt: 2, ml: 2 }}>

                        <Typography
                            //variant={isSmallScreen ? 'h6' : 'h6'}
                            variant="subtitle2" fontWeight="530"
                        //className={classes.cardTitle}
                        >
                            {title}
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <Chart
                                options={optionscolumnchart}
                                series={seriescolumnchart}
                                type="donut"
                                height={`${getChartSize()}px`} // Set height dynamically
                            />
                        </Grid>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
    );
};

export { CumulativeStatus };


