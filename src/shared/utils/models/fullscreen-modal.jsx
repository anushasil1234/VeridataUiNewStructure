import { Dialog, ListItem, List, AppBar, Toolbar, IconButton, Slide, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { fullScreenListItemStyle, modelToolbar } from 'app';
import PropTypes from "prop-types";
import { forwardRef } from 'react';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenModel({ fullScreen, open, closeModel, content, screensize, headerText }) {

    return (
        <Dialog
            maxWidth={screensize}
            fullScreen={fullScreen}
            open={open}
            onClose={closeModel}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ ...modelToolbar, position: 'sticky', top: '0', }}>
                <Toolbar >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeModel}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                    {headerText &&
                        <Typography sx={{ ml: "5px", fontWeight: 'bold', textAlign: 'center' }} fontSize={15}>{headerText}</Typography>
                    }
                </Toolbar>
            </AppBar>
            <List>
                <ListItem sx={fullScreenListItemStyle} >
                    {content}
                </ListItem>
            </List>
        </Dialog>
    );
}

FullScreenModel.propTypes = {
    fullScreen: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    closeModel: PropTypes.func.isRequired,
    content: PropTypes.element.isRequired
}