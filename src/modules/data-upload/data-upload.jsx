import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardLayout, PageLayout } from 'shared/utils';
import { sampleDownLoadLinkContainerStyle } from 'app';
import { DownloadSampleXlsFile_URL } from 'shared/constants/constants';
import ActionPermission from 'shared/components/action-permission/action-permission';
import FileUpload from 'shared/components/file-upload/file-upload';
import { Typography, Box } from '@mui/material';



const UnWrrappedDataUpload = (props) => {
    const { hasPermission } = props;
    const apiSlice = useSelector(state => state.apiSlice)
    const { downloadReport } = apiSlice[0];

    const [files, setFiles] = useState([])
    const [tableFileUpload, setTableFileUpload] = useState({
        tableHeading: "List of Files Upload",
        rows: [
            {
                id: 1,
                col1: null,
            },
        ],
        columns: [
            { id: "col1", label: 'File Name', minWidth: 100 },

        ]
    })
    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }
   
    const [tableData, setTableData] = useState({
        tableHeaders: [
            "Error Messages",
            "Data"
        ],
        rows: []
    })

    return (
        <PageLayout pageName={"File Upload"}>
            <CardLayout>
                <Box sx={sampleDownLoadLinkContainerStyle}>
                    <Typography onClick={() => downloadReport(DownloadSampleXlsFile_URL)} >Download New Appointee Template</Typography>
                </Box> 
                {
                 hasPermission && hasPermission['A006'] &&
                    <Box mt={3}>
                        <FileUpload
                            setTableData={setTableData}
                            tableData={tableData}
                            tableFileUpload={tableFileUpload}
                            setFileName={setTableFileUpload}
                            files={files}
                            setFiles={setFiles}
                            removeFile={removeFile}
                            hasPermission={hasPermission}
                        />
                    </Box>
                }
            </CardLayout>
        </PageLayout>
    );
}
const DataUpload = ActionPermission(UnWrrappedDataUpload)
export default DataUpload


