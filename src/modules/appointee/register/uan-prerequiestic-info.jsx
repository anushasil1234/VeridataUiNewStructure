import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { prerequisiteListStyle } from 'app';
import { Link } from 'react-router-dom';
import Steps from 'shared/utils/steps/Steps';


const UANPrerequisiteInformation = () => {
    const stepList = [
        {
            StepNumber: '1',
            primaryHeading: 'Go to EPFO Member Portal',
            secondaryText: 'Please go to EPF member portal.',
            secondaryComponent:
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    Please go to EPF member portal.
                    (
                    <Link
                        style={{
                            color: "#1976d2"
                        }}
                        target="_blank" to={'https://unifiedportal-mem.epfindia.gov.in/memberinterface/'}>
                        click here
                    </Link>
                    )
                </Typography>

        },
        {
            StepNumber: '2',
            primaryHeading: 'Login',
            secondaryText: 'Login with your creadential and download details.',
            secondaryComponent: null

        },
        {
            StepNumber: '3',
            primaryHeading: 'Upload the details here',
            secondaryText: null,
            secondaryComponent: null
        },
    ]
    return (
        <Steps stepList={stepList} />
    )
}

export default UANPrerequisiteInformation