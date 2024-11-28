


// export const removeFile = ({ uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType, currentFileName = null }) => {

//     console.log('currentFileName', currentFileName, uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType);

//     let updatedUploadedFileList = [...uploadedFile];
//     let updatedFileDetails = [...fileDetails];
//     console.log('removeFilefileDetails', fileDetails);

//     if (uploadType === 'single') {


//         const existingFileIndex = uploadedFile.findIndex(
//             (uploadedFile) => uploadedFile.uploadTypeAlias === uploadTypeAlias
//         );
//         if (existingFileIndex !== -1) {
//             // If a file with the same uploadTypeAlias exists, remove it
//             console.log("uploadedFileremoveFile", uploadedFile, fileDetails, uploadTypeAlias, existingFileIndex);
//             // console.log("existingFileIndex", existingFileIndex);

//             updatedUploadedFileList.splice(existingFileIndex, 1);
//             const { fileName, mimeType, fileLength } = uploadedFile[existingFileIndex];

//             updatedFileDetails = updatedFileDetails.filter(({ name, size, type }) => !(name === fileName && size === fileLength && type === mimeType));
//             console.log("existingFile11", uploadedFile[existingFileIndex], updatedFileDetails);
//             console.log("existingFile22", uploadedFile[existingFileIndex], updatedFileDetails);
//             console.log("updatedFileDetails123", updatedFileDetails);

//             // updatedFileDetails.splice(existingFileIndex, 1);
//         }
//     } else {
//         console.log('uploadedFile', uploadedFile);

//         const existingFileIndex = uploadedFile.findIndex(
//             (uploadedFile) => (uploadedFile.uploadTypeAlias === uploadTypeAlias && uploadedFile.fileName === currentFileName)
//         );
//         console.log('existingFileIndex', existingFileIndex, updatedUploadedFileList);

//         if (existingFileIndex !== -1) {
//             // If a file with the same uploadTypeAlias exists, remove it
//             updatedUploadedFileList.splice(existingFileIndex, 1);
//             const { fileName, mimeType, fileLength } = uploadedFile[existingFileIndex];

//             updatedFileDetails = updatedFileDetails.filter(({ name, size, type }) => !(name === fileName && size === fileLength && type === mimeType));
//             // updatedFileDetails.splice(existingFileIndex, 1);
//             const existingFileNameIndex = fileNameList.findIndex(
//                 (fileName) => (fileName === currentFileName)
//             );
//             fileNameList.splice(existingFileNameIndex, 1);
//         }
//     }
//     console.log(`fileNameList,
//         updatedUploadedFileList,
//         updatedFileDetails`,
//         fileNameList,
//         updatedUploadedFileList,
//         updatedFileDetails);

//     return {
//         fileNameList,
//         updatedUploadedFileList,
//         updatedFileDetails
//     }
// }

export const removeFile = ({ uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType, currentFileName = null }) => {
    console.log('Removing file with details:', { currentFileName, uploadedFile, fileDetails, uploadTypeAlias, fileNameList, uploadType });

    const updatedUploadedFileList = [...uploadedFile];
    let updatedFileDetails = [...fileDetails];

    const existingFileIndex = uploadedFile.findIndex(
        (file) =>
            file.uploadTypeAlias === uploadTypeAlias &&
            (uploadType === 'single' || file.fileName === currentFileName)
    );

    if (existingFileIndex !== -1) {
        const { fileName, mimeType, fileLength } = uploadedFile[existingFileIndex];

        // Remove from uploaded file list
        updatedUploadedFileList.splice(existingFileIndex, 1);

        // Filter out from file details
        updatedFileDetails = updatedFileDetails.filter(
            ({ name, size, type }) => !(name === fileName && size === fileLength && type === mimeType)
        );

        // Remove from file name list if applicable
        if (uploadType !== 'single') {
            const fileNameIndex = fileNameList.indexOf(currentFileName);
            if (fileNameIndex !== -1) fileNameList.splice(fileNameIndex, 1);
        }
    }

    console.log('Updated lists:', { fileNameList, updatedUploadedFileList, updatedFileDetails });

    return { fileNameList, updatedUploadedFileList, updatedFileDetails };
};
