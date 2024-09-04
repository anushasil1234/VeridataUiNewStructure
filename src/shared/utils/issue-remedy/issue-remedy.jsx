import React, { useState } from 'react';
import { useEffect } from 'react';
import parse from "html-react-parser";
import FullScreenModel from '../models/fullscreen-modal';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { hasValue } from '..';

const IssueRemedyContent = ({ remedyModelProps }) => {

    const { remarksId, remedyType, remedySubType } = remedyModelProps;

    const apiSlice = useSelector(state => state.apiSlice);

    const { getRemarksRemedyData } = apiSlice[0];

    const [remedy, setremedy] = useState("");
    const postRemedypayLoad = {
        remarksId: remarksId,
        remedyType: remedyType,
        remedySubType: remedySubType
      }
    const fetchRemedy = async (postRemedypayLoad) => {
        const response = await getRemarksRemedyData(postRemedypayLoad);
        if (response) {
            const { responseInfo } = response;
            console.log("responseInfo",parse(remedy))
            if (responseInfo) {
                setremedy(responseInfo);

            } else {

                setremedy(null);
            }
        }
    }
    useEffect(() => {
        // const postRemedypayLoad = {
        //     remarksId: remarksId,
        //     remedyType: remedyType,
        //     remedySubType: remedySubType
        //   }
        fetchRemedy(postRemedypayLoad)
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
