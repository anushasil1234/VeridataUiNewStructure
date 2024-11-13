import { Download, ZoomIn, ZoomOut } from '@mui/icons-material';
import { Box, Stack, IconButton } from '@mui/material';
import { actionIconStyle, downloadIconStyle, fileImageStyle, imageFileContainerStackStyle, imageFileContainerStyle, pdfFileContainerStyle, zoombuttonStyle, zoomOutstackStyle } from 'app';
import React from 'react'
import { FabIcon } from 'shared/utils';
import downloadFile from 'shared/utils/associate/download-file';
import FabIconPropsModel from 'shared/utils/fab-icon/fab-icon-model';
import FullScreenModel from 'shared/utils/models/fullscreen-modal'
import { useState } from 'react';
import { handleZoom } from 'shared/utils/associate/Zoomin-out';

const UnWrappedDocumentView = ({ documentModelProps,zoomLevel }) => {
    const { fileDetails, filename } = documentModelProps;
    const { fileName } = fileDetails;
    const mimeType = fileDetails.split(';')[0].split(':')[1];
   
    return (
        <Stack sx={{ position: 'relative' }}>
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
                        :
                        <img src={fileDetails} style={{ ...fileImageStyle, transform: `scale(${zoomLevel})`, transformOrigin: 'center' }} alt={fileName} />
                    }
                </Box>
            </Stack>
     
        </Stack>
    );
};


const DocumentView = (props) => {
    const { documentModelProps = {} } = props;
    const {filename, fileDetails } = documentModelProps;
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = () => {
        setZoomLevel(handleZoom('in'));
    };
    const handleZoomOut = () => {
        setZoomLevel(handleZoom('out'));
    };
    
    const downloadFabProps = new FabIconPropsModel(
        downloadIconStyle,
        () => downloadFile(fileDetails, filename),
        "secondary",
        "download",
        <Download />,
        "Download"
    );
    const downloadButton = (
        <FabIcon props={{ ...downloadFabProps, size: "small", selectedIndex: 2, index: 2 }} />
    );
    const zoomControls = (
       <>
            <IconButton sx={{...zoombuttonStyle}} onClick={handleZoomOut} aria-label="zoom out">
                <ZoomOut />
            </IconButton>
            <IconButton sx={{...zoombuttonStyle}}  onClick={handleZoomIn} aria-label="zoom in">
                <ZoomIn />
            </IconButton>
            </>
    );
    return (
        <FullScreenModel
            headerText={filename}
            open={props.open}
            closeModel=
            {props.closeDocumentModel}
            screensize={"500"}
            fullScreen={false}
            content={<UnWrappedDocumentView documentModelProps={documentModelProps} handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} zoomLevel={zoomLevel} />}
            actionButton={downloadButton}
            zoomControls={zoomControls}
        />
    )
}
export default DocumentView