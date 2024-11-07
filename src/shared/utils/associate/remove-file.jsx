export const removeFile = ({ uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType, currentFileName = null }) => {
    let updatedUploadedFileList = [...uploadedFile];
    let updatedFileDetails = [...fileDetails];

    if (uploadType === 'single') {
        const existingFileIndex = uploadedFile.findIndex(
            (uploadedFile) => uploadedFile.uploadTypeAlias === uploadTypeAlias
        );
        if (existingFileIndex !== -1) {
            // If a file with the same uploadTypeAlias exists, remove it
            updatedUploadedFileList.splice(existingFileIndex, 1);
            updatedFileDetails.splice(existingFileIndex, 1);
        }
    } else {
        const existingFileIndex = uploadedFile.findIndex(
            (uploadedFile) => (uploadedFile.uploadTypeAlias === uploadTypeAlias && uploadedFile.fileName === currentFileName)
        );
        if (existingFileIndex !== -1) {
            // If a file with the same uploadTypeAlias exists, remove it
            updatedUploadedFileList.splice(existingFileIndex, 1);
            updatedFileDetails.splice(existingFileIndex, 1);
            const existingFileNameIndex = fileNameList.findIndex(
                (fileName) => (fileName === currentFileName)
            );
            fileNameList.splice(existingFileNameIndex, 1);
        }
    }
    return {
        fileNameList,
        updatedUploadedFileList,
        updatedFileDetails
    }
}