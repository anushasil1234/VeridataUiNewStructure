export const removeFile = ({ uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType, currentFileName = null }) => {

    console.log('currentFileName', currentFileName, uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType);

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
        console.log('uploadedFile', uploadedFile);
        
        const existingFileIndex = uploadedFile.findIndex(
            (uploadedFile) => (uploadedFile.uploadTypeAlias === uploadTypeAlias && uploadedFile.fileName === currentFileName)
        );
        console.log('existingFileIndex', existingFileIndex, updatedUploadedFileList);
        
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
    console.log(`fileNameList,
        updatedUploadedFileList,
        updatedFileDetails`,
        fileNameList,
        updatedUploadedFileList,
        updatedFileDetails);

    return {
        fileNameList,
        updatedUploadedFileList,
        updatedFileDetails
    }
}