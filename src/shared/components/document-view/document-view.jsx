import { Download , ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, Stack, Typography,IconButton  } from '@mui/material';
import { actionIconStyle, fileImageHeaderStyle, fileImageStyle, fileTypeStyle, imageFileContainerStackStyle, imageFileContainerStyle, pdfFileContainerStyle, zoomOutstackStyle } from 'app';
import React from 'react'
import { FabIcon } from 'shared/utils';
import downloadFile from 'shared/utils/associate/download-file';
import FabIconPropsModel from 'shared/utils/fab-icon/fab-icon-model';
import FullScreenModel from 'shared/utils/models/fullscreen-modal'
import  { useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
const UnWrappedDocumentView = ({ documentModelProps }) => {
    const { fileDetails , fileType } = documentModelProps;
    const { fileName } = fileDetails;
    const mimeType = fileDetails.split(';')[0].split(':')[1];
    const [zoomLevel, setZoomLevel] = useState(1);
    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3)); 
    };
    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); 
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
                    <embed src={`${fileDetails}#toolbar=0`} height="500" width="100%" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}></embed>
    //                   <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js`}>
    //     <Viewer fileUrl={fileUrl} />
    //   </Worker>
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