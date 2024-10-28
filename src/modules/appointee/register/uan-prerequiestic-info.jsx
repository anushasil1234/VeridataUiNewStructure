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


const UANPrerequisiteInformation = () => {

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="1" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    sx={prerequisiteListStyle}
                    primary="Go to EPFO Member Portal"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Please go to EPF member portal.
                                <Link
                                    style={{
                                        color: "#1976d2"
                                    }}
                                    target="_blank" to={'https://unifiedportal-mem.epfindia.gov.in/memberinterface/'}>
                                     click here 
                                </Link>
                            </Typography>

                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="2" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Login"
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Login with your creadential and download details.
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="3" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Upload the details here"
                />
            </ListItem>
        </List>
    )
}

export default UANPrerequisiteInformation