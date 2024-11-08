import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { candidatefileViewContainerStyle, listHeadingStyle, rightMostBtnStyle, submitBtnStyle } from 'app'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SelectInput from 'shared/components/input-fields/select-input'
import { fileTypeList, passbookCategoryTypeList } from 'shared/constants/constants'
import filterDocVerificationList from 'shared/utils/associate/filter-doc-verification-list'

const FiledetailsSection = ({ verificationType, fileSrc }) => {
    const [zoom, setZoom] = useState(1);

    const zoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // max zoom level 3x
    };

    const zoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // min zoom level 1x (original size)
    };

    // useEffect(() => {
    // }, [])


    return (
        <>
            <Grid
                // sx={{ paddingLeft: "20px", width: "50%" }}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ paddingX: "1rem", marginTop: "2px" }}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: "left" }}>
                        {`${verificationType.label} Verification`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12} md={8}>
                    <Box sx={candidatefileViewContainerStyle}>
                        <img style={{
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.3s ease',
                            transformOrigin: 'center',
                            margin: 'auto',
                        }}
                            src={fileSrc}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'end' }}>
                        <Button
                            //onClick={() => setCurrentPageNo(1)}
                            // onClick={() => submitDetails(false, true)}
                            //sx={{ m: "15px 5px", ml: 3 }}
                            sx={submitBtnStyle}
                            variant="contained"
                            color="primary"
                        >
                            {'Submit'}
                        </Button>
                        <Button
                            //onClick={() => setCurrentPageNo(1)}
                            // onClick={() => submitDetails(false, true)}
                            //sx={{ m: "15px 5px", ml: 3 }}
                            sx={rightMostBtnStyle}
                            variant="contained"
                            color="primary"
                        >
                            {'Close'}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default FiledetailsSection