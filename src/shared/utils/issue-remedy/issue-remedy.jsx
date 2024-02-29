import React, { useState } from 'react';
import { useEffect } from 'react';
import parse from "html-react-parser";
import FullScreenModel from '../models/fullscreen-modal';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { hasValue } from '..';

const IssueRemedyContent = ({ remedyModelProps }) => {

    const { remarksId } = remedyModelProps;

    const apiSlice = useSelector(state => state.apiSlice);

    const { getRemarksRemedyData } = apiSlice[0];

    const [remedy, setremedy] = useState("");
    const fetchRemedy = async (remarksId) => {
        const response = await getRemarksRemedyData(remarksId);
        if (response) {
            const { responseInfo } = response;
            if (responseInfo) {
                setremedy(responseInfo);

            } else {

                setremedy(null);
            }
        }
    }
    useEffect(() => {
        fetchRemedy(remarksId)
    }, []);

    return (
        <>
            <Box>
                {
                    hasValue(remedy) ? parse(remedy) : <Typography> No data available</Typography>
                }
            </Box>
        </>
    );
}

const IssueRemedy = (props) => {

    return (
        <FullScreenModel
            open={props.open}
            screensize={"1200"}
            fullScreen={false}
            closeModel=
            {props.closeRemedyModel}
            content={<IssueRemedyContent
                {...props} />}
        />
    )
}
export default IssueRemedy;
