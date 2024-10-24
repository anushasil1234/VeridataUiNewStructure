import React, { } from 'react'
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { fileCard, fileInputs } from 'app';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { generateUPloadErrorMessage } from 'shared/utils';
import { toDataUploaded } from 'shared/constants/constants';
import Button1 from 'shared/utils/button/button1';
import downloadFile from 'shared/utils/associate/download-file';
import UpdateButton from '../update-button.jsx/update-button';


const dialogComponent =
    <Box p={2}>
        <Typography fontSize={15} fontWeight={"bold"}>
            <Typography fontSize={15}>System will proceed with valid data and non duplicate data.</Typography>
        </Typography>
        <Typography mt={2}>
            Do you want to continue?
        </Typography>
    </Box>

const FileUpdate = ({ files, setFiles, removeFile,
    setFileName, tableFileUpdate, addToAppointeeListHandler, ...props }) => {

    const functionSlice = useSelector((state) => state.functionSlice);
    const apiSlice = useSelector((state) => state.apiSlice);
    const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
    const loggedInData = useSelector((state) => state.loggedInData);

    const { companyId, userId } = loggedInData[0];
    const { openConfirmationModel, openInfoModel } = functionSlice[0];
    const { postUpdateExcel } = apiSlice[0];
    const { navigateTo } = commonHooksFunctionSlice[0];

    const taskAfterClickOnOk = (rawFileDataCount, fileId) => {
        if (rawFileDataCount > 0) {
            navigateTo(toDataUploaded, { fileId });
        }
    }
    const uploadHandler = async (event) => {

        const FileDetails = event.target.files[0];
        const formData = new FormData();
        formData.append("CompanyId", companyId)
        formData.append("UserId", userId)
        formData.append("FileDetails", FileDetails)

        const response = await postUpdateExcel(formData);
        if (response) {
            const { duplicateCount, invalidUserCount, nonExsitingCount, rawFileData, downloadFileData } = response.responseInfo;
            const rawFileDataCount = rawFileData.length;
            let fileId;
            if (rawFileDataCount > 0) {
                fileId = rawFileData[0];
            }
            if (duplicateCount > 0 || invalidUserCount > 0 || nonExsitingCount > 0) {
                let dialogContentText = generateUPloadErrorMessage(duplicateCount, invalidUserCount, rawFileDataCount);
                dialogContentText =
                    <>
                        {dialogContentText}
                        <Stack flexDirection={"row"}>
                            {
                                downloadFileData && downloadFileData.length > 0 && downloadFileData.map(({ fileData, fileName, fileType }, index) => {
                                    const downLoadName = fileName.replace(/_/g, " ");
                                    fileName = `${fileName}.${fileType}`;
                                    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
                                    return (
                                        <Button1
                                            key={index}
                                            onClick={() => downloadFile(linkSource, fileName)}
                                            variant="contained"
                                            sx={{ fontWeight: "bold", mr: "2rem", mt: "1rem" }} endIcon={<Download sx={{ color: "#fff" }} />}>
                                            {downLoadName}
                                        </Button1>
                                    )
                                })
                            }
                        </Stack>
                    </>
                openInfoModel({ dialogContentText }, () => taskAfterClickOnOk(rawFileDataCount, fileId));
            }
            if (duplicateCount === 0 && invalidUserCount === 0 && rawFileDataCount > 0) {
                navigateTo(toDataUploaded);
            }
        }
    }
    const handleInputChange = (event) => {
        const confirmationModelContent = {
            dialogComponent,
        }
        openConfirmationModel(confirmationModelContent, () => uploadHandler(event));
    }

    return (
        <div>
            <Stack sx={fileCard}>
                <Typography>
                    Choose a .XLSX file to update:
                </Typography>
                <Stack ml={2}>
                    <Box sx={fileInputs}>
                        <input
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            type="file"
                            onClick={(e) => e.target.value = null}
                            onChange={handleInputChange}
                        />

                        <UpdateButton />
                    </Box>
                </Stack>

            </Stack>
        </div>
    )
}

export default FileUpdate