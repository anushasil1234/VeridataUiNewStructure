import { Dialog, ListItem, List, AppBar, Toolbar, IconButton, Slide, Typography, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { fileNameStyle, fileNameStyleinview, fullScreenListItemStyle, modelToolbar } from 'app';
import PropTypes from "prop-types";
import { forwardRef } from 'react';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenModel({ fullScreen, open, closeModel, content, screensize, headerText, actionButton, zoomControls }) {

    return (
        <Dialog
            maxWidth={screensize}
            fullScreen={fullScreen}
            open={open}
            onClose={closeModel}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ ...modelToolbar, position: 'sticky', top: '0' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '-5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeModel}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        {headerText && (
                            <Typography sx={{ ...fileNameStyleinview, ml: "5px", fontWeight: 'bold' }} fontSize={15}>
                                {headerText}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center',gap:-1 }}>
                        {zoomControls}
                        {actionButton}
                    </Box>
                </Toolbar>
            </AppBar>
            <List sx={{ height: 'fit-content' }}>
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