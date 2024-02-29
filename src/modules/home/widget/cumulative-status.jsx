import React from 'react';
import Chart from 'react-apexcharts';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { WidgetCard } from '.';
import { useSelector } from 'react-redux';
import { statusChartColorList } from 'app';

const CumulativeStatus = () => {
    const apiSlice = useSelector((state) => state.apiSlice);
    
    const { getTotalWidgetData } = apiSlice[0];

    const [seriescolumnchart, setSeriescolumnchart] = useState([]);

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


    // chart
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
            show: true
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

    return (
        <WidgetCard title="Status ">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="donut"
                        height="150px"
                    />
                </Grid>
            </Grid>
        </WidgetCard>
    );
};

export { CumulativeStatus };
