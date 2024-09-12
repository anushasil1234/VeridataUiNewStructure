import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

const PrerequisiteInformation = () => {
    const functionSlice = useSelector(state => state.functionSlice);
    const { openRemedyModel } = functionSlice[0];

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Aadhar" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText

                    primary="Aadhar Number"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Please have your addhar and pan card  before continuing.
                            </Typography>
                            {' — If you dont have an addhar please contact with your Hr'}
                            <Box >
                                <Button onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHAR" })}>
                                    ...show more info
                                </Button>
                            </Box>

                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Mobile" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Mobile Number"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Check if the given mobile is pinned with aadhar.
                            </Typography>
                            {" — Other wise contact with respective hr to update mobile number. "}
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="UAN" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="UAN"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                If you have a UAN account, make sure you have a activate it
                            </Typography>
                            {" — Please login to the epfo portal at least once and then try verifying you details."}
                            <Box >
                                <Button onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "INACTUAN" })}
                                >
                                    ...show more info
                                </Button>
                            </Box>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Verification" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Verify"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                All verifications are mandatory 
                            </Typography>
                            {" — Please complete all of them. Dont leave out any information asked for."}
                            <Box >
                                {/* <Button onClick={() => openRemedyModel({remedyType: "OTH", remedySubType: "INACTUAN" })}
                                > */}
                                <Typography color="#1976d2">
                                    To know about the verification process in details, pls go to FAQ" and FAQ will have the above section on verification process
                                </Typography>
                                {/* </Button> */}
                            </Box>
                        </>
                    }
                />
            </ListItem>

        </List>
    )
}

export default PrerequisiteInformation