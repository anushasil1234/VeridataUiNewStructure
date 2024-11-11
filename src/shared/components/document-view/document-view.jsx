import { Download , ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, Stack, Typography,IconButton  } from '@mui/material';
import { actionIconStyle, fileImageHeaderStyle, fileImageStyle, fileTypeStyle, imageFileContainerStackStyle, imageFileContainerStyle, pdfFileContainerStyle, zoomOutstackStyle } from 'app';
import React from 'react'
import { FabIcon } from 'shared/utils';
import downloadFile from 'shared/utils/associate/download-file';
import FabIconPropsModel from 'shared/utils/fab-icon/fab-icon-model';
import FullScreenModel from 'shared/utils/models/fullscreen-modal'
import  { useState } from 'react';
import { handleZoom } from 'shared/utils/associate/Zoomin-out';
// import { handleZoom } from 'shared/utils/associate/Zoomin-out';
const UnWrappedDocumentView = ({ documentModelProps }) => {
    const { fileDetails , fileType } = documentModelProps;
    const { fileName } = fileDetails;
    const mimeType = fileDetails.split(';')[0].split(':')[1];
    const [zoomLevel, setZoomLevel] = useState(1);
    const handleZoomIn = () => {
        setZoomLevel(handleZoom('in'));
      };
    
      const handleZoomOut = () => {
        setZoomLevel(handleZoom('out')); 
      };

    const downloadFabProps = new FabIconPropsModel(
        actionIconStyle,
        ()=> downloadFile(fileDetails, fileType),
        "secondary",
        "download",
        <Download />,
        "Download"
    );
    return (
        <Stack sx={{ position: 'relative' }}>
        <Stack sx={fileImageHeaderStyle}>
            <Typography sx={fileTypeStyle}>{fileType}</Typography>
            <FabIcon
                props={{
                    ...downloadFabProps,
                    selectedIndex: 2,
                    index: 2,
                    size: "small"
                }}
            />
        </Stack>

        
        <Stack
            sx={{...zoomOutstackStyle}}
        >
            <IconButton color="secondary" onClick={handleZoomOut} aria-label="zoom out">
                <ZoomOut />
            </IconButton>
            <IconButton color="secondary" onClick={handleZoomIn} aria-label="zoom in">
                <ZoomIn />
            </IconButton>
        </Stack>

       
        <Stack sx={imageFileContainerStackStyle}>
            <Box
                sx={{
                    ...(mimeType === 'application/pdf' ? pdfFileContainerStyle : imageFileContainerStyle),
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s'
                }}
            >
                {mimeType === 'application/pdf' ? 
                    <iframe src={fileDetails} height="500" width="100%" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}></iframe>
                :
                    <img src={fileDetails} style={{ ...fileImageStyle, transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} alt={fileName} />
                }
            </Box>
        </Stack>
    </Stack>
);
};


const DocumentView = (props) => {
    return (
        <FullScreenModel
            open={props.open}
            closeModel=
            {props.closeDocumentModel}
            screensize={"500"}
            fullScreen={false}
            content={<UnWrappedDocumentView
                {...props} />}
        />
    )
}
export default DocumentView