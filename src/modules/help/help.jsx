import { Accordion, AccordionDetails, AccordionSummary, Fade, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ExpandMore';
// import { useLocation } from "react-router-dom";

const Help = () => {
    const [responseList, setResponseList] = useState(null);
    const apiSlice = useSelector((state) => state.apiSlice);
    const { GetFaqData } = apiSlice[0];
    const handleGetHalpData = async () => {
        const response = await GetFaqData();
        if (response) {
            const { responseInfos } = response;
            setResponseList(responseInfos);
        }
    }

    useEffect(() => {
        handleGetHalpData();

    }, []);
    return (
        <div>
            {responseList && responseList.map((element, index) => {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography> Q{index+1} : {element.faqName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {element.faqDescription}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })
            }

        </div>
    );
}

export default Help