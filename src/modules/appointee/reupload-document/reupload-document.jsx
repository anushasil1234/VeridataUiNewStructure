import { Box, Grid } from '@mui/material'
import { candidateRegistrationFormContainerStyle } from 'app'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CardLayout, PageLayout } from 'shared/utils'
import { ReuploadForm } from './reupload-form'
import NotAccessibleSection from 'shared/components/not-accessible/not-accessible'

const ReuploadDocument = () => {
    const loggedInData = useSelector((state) => state.loggedInData);
    const { status } = loggedInData[0];
  
    const [isFileReUploadPermitted, setIsFileReUploadPermitted] = useState();
   

    useEffect(() => {
      

        if (status === 'Doc Reupload') {
            setIsFileReUploadPermitted(true);
        }
        else {
            setIsFileReUploadPermitted(false);
        }
    }, [status])


    return (
        <PageLayout pageName={"Document Reupload"}>
            <CardLayout>
                <Box sx={{ width: "100%" }}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={2.5}
                            item
                            xs={12}
                            md={12}
                            sx={candidateRegistrationFormContainerStyle}
                        >
                            <Box sx={{ width: "100%" }}>
                                {isFileReUploadPermitted === true ?
                                    <ReuploadForm /> :
                                    <NotAccessibleSection />
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardLayout>
        </PageLayout>

    )
}

export default ReuploadDocument