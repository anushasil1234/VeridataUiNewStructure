import { React, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { CardLayout, PageLayout } from "shared/utils";
import { sampleDownLoadLinkContainerStyle } from "app";
import { DownloadUpdateSampleXlsFile_URL } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import FileUpdate from "shared/components/file-update/file-update";
import { Typography } from "@mui/material";

const UnWrrappedDataUpdate = (props) => {
  const { hasPermission } = props;
  const apiSlice = useSelector((state) => state.apiSlice);
  const { downloadReport } = apiSlice[0];

  const [files, setFiles] = useState([]);
  const [tableFileUpload, setTableFileUpload] = useState({
    tableHeading: "List of Files Upload",
    rows: [
      {
        id: 1,
        col1: null,
      },
    ],
    columns: [{ id: "col1", label: "File Name", minWidth: 100 }],
  });
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const [tableData, setTableData] = useState({
    tableHeaders: ["Error Messages", "Data"],
    rows: [],
  });

  return (
    <PageLayout pageName={"Bulk Update Data"}>
      <CardLayout>
        <Box sx={sampleDownLoadLinkContainerStyle}>
          <Typography
            onClick={() => downloadReport(DownloadUpdateSampleXlsFile_URL)}
          >
            Download Bulk Update Template
          </Typography>

        </Box>
        {
          <Box mt={3}>
            <FileUpdate
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
};
const DataUpdate = ActionPermission(UnWrrappedDataUpdate);
export default DataUpdate;
