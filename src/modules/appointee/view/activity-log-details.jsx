import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { accordionStyle, badgeDesc, listHeadingStyle, timelineDot } from 'app';
import {
    Timeline,
     TimelineConnector, 
    TimelineContent, 
    TimelineDot, 
    TimelineItem, 
    TimelineOppositeContent, 
    TimelineSeparator, 
    timelineOppositeContentClasses } from '@mui/lab';
import { DDMMYYHHMM } from 'shared/utils';



const ActivityLogDetails = ({ activityStatus }) => {

    return (

        <Accordion sx={accordionStyle}>
            <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={listHeadingStyle} >Activity Log</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Timeline
                    className="theme-timeline"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    sx={{
                        p: 0,
                        '& .MuiTimelineConnector-root': {
                            width: '5px',
                            backgroundColor: '#efefef'
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.5,
                            paddingLeft: 0,
                        },
                    }}
                >


                    {activityStatus.length > 0 ?

                        <>
                            {activityStatus.map((value, index) => {
                                return (
                                    <TimelineItem>
                                        <TimelineOppositeContent sx={{ padding: "6px 5px" }}>
                                            <Typography sx={{ fontSize: ".9rem" }}>{DDMMYYHHMM(value.createdOn)}</Typography>

                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot sx={{ ...timelineDot, borderColor: value.color }} color="primary" variant="outlined" />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography sx={{ fontSize: ".9rem", fontWeight: "600" }} >{value.activityInfo}</Typography>
                                            <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: value.color,
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                label={value.activityType}
                                            ></Chip>
                                            <Typography sx={badgeDesc}>{value.activityName}</Typography>
                                        </TimelineContent>
                                        
                                    </TimelineItem>
                                );


                            })}

                        </> :
                        <Typography my={"20px"} fontWeight={"600"}>
                            No Records Found
                        </Typography>}
                </Timeline>
            </AccordionDetails>
        </Accordion>

    );
};

export default ActivityLogDetails;
